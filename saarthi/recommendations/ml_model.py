import joblib
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
import warnings
from django.conf import settings

# Suppress scikit-learn version warnings
warnings.filterwarnings('ignore', category=UserWarning, module='sklearn')

# Global variables to cache loaded models
_vectorizer = None
_rf_model = None
_data = None

def load_models():
    """
    Load the ML models and data. This function caches the models to avoid
    reloading them on every request.
    """
    global _vectorizer, _rf_model, _data
    
    if _vectorizer is None or _rf_model is None or _data is None:
        # Get the base directory (Django project root)
        base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        
        # Load the vectorizer
        vectorizer_path = os.path.join(base_dir, 'vectorizer.joblib')
        _vectorizer = joblib.load(vectorizer_path)
        
        # Load the random forest model
        model_path = os.path.join(base_dir, 'rf_model.joblib')
        _rf_model = joblib.load(model_path)
        
        # Load the data
        data_path = os.path.join(base_dir, 'combined_data.xlsx')
        _data = pd.read_excel(data_path)
    
    return _vectorizer, _rf_model, _data

def recommend_jobs(user_skills, top_n=3):
    """
    Recommend jobs using a hybrid approach combining cosine similarity and Random Forest predictions.
    
    The hybrid score is calculated as: 0.6 * cosine_score + 0.4 * rf_score
    
    Args:
        user_skills (list): List of user skills as strings
        top_n (int): Number of top recommendations to return
    
    Returns:
        list: List of dictionaries containing job recommendations with title, hybrid_score, 
              and other available columns like department, location, company, duration, stipend
    """
    try:
        # Load models and data
        vectorizer, rf_model, data = load_models()
        
        # Skill mapping for frameworks not in training data
        skill_mappings = {
            'django': ['python', 'web', 'api', 'rest'],
            'flask': ['python', 'web', 'api', 'rest'],
            'fastapi': ['python', 'api', 'rest'],
            'spring boot': ['java', 'api', 'rest'],
            'express': ['javascript', 'node.js', 'api', 'rest'],
            'vue': ['javascript', 'frontend', 'web'],
            'angular': ['javascript', 'frontend', 'web'],
            'laravel': ['php', 'web', 'api'],
            'ruby on rails': ['ruby', 'web', 'api'],
        }
        
        # Expand user skills with mappings
        expanded_skills = []
        for skill in user_skills:
            skill_lower = skill.lower().strip()
            expanded_skills.append(skill)  # Keep original
            
            # Add mapped skills if they exist
            if skill_lower in skill_mappings:
                expanded_skills.extend(skill_mappings[skill_lower])
        
        # Remove duplicates and join into text
        expanded_skills = list(set(expanded_skills))
        user_skills_text = ' '.join(expanded_skills)
        user_vector = vectorizer.transform([user_skills_text])
        
        # Step 2: Use 'all_skills' column which contains the combined skills
        if 'all_skills' in data.columns:
            job_skills_text = data['all_skills'].fillna('').astype(str)
        else:
            # Fallback: use skill columns if all_skills doesn't exist
            skill_columns = [col for col in data.columns if 'skill' in col.lower()]
            if skill_columns:
                job_skills_text = data[skill_columns].fillna('').apply(lambda x: ' '.join(x), axis=1)
            else:
                raise ValueError("No suitable skills column found in the data")
        
        # Vectorize job skills
        job_vectors = vectorizer.transform(job_skills_text)
        
        # Step 3: Compute cosine similarity between user_vector and job skill vectors
        cosine_scores = cosine_similarity(user_vector, job_vectors).flatten()
        
        # Step 4: Get Random Forest predictions
        rf_probabilities = rf_model.predict_proba(user_vector)[0]  # Get probabilities for first (only) sample
        rf_classes = rf_model.classes_  # Get the class labels (job labels/indices)
        
        # Step 5: Group by unique job titles to avoid duplicates and get best scores
        job_title_scores = {}
        
        for idx in range(len(data)):
            # Get job title for this row
            job_title = str(data.iloc[idx]['Job Title']) if 'Job Title' in data.columns else f"Job {idx + 1}"
            
            # Get cosine score for this job
            cosine_score = cosine_scores[idx]
            
            # Get RF score based on Job_Label if it exists
            rf_score = 0.0
            if 'Job_Label' in data.columns:
                job_label = data.iloc[idx]['Job_Label']
                # Find the RF probability for this job label
                if job_label in rf_classes:
                    label_idx = np.where(rf_classes == job_label)[0]
                    if len(label_idx) > 0:
                        rf_score = rf_probabilities[label_idx[0]]
            
            # Calculate hybrid score: 0.6 * cosine_score + 0.4 * rf_score
            hybrid_score = 0.6 * cosine_score + 0.4 * rf_score
            
            # Keep the best score for each unique job title
            if job_title not in job_title_scores or hybrid_score > job_title_scores[job_title]['score']:
                job_title_scores[job_title] = {
                    'score': hybrid_score,
                    'index': idx,
                    'cosine_score': cosine_score,
                    'rf_score': rf_score
                }
        
        # Step 6: Sort by hybrid_score and get top_n unique jobs
        sorted_jobs = sorted(job_title_scores.items(), key=lambda x: x[1]['score'], reverse=True)
        top_jobs = sorted_jobs[:top_n]
        
        # Step 7: Prepare final recommendations with all available data
        recommendations = []
        for job_title, job_info in top_jobs:
            idx = job_info['index']
            
            job_details = {
                'title': job_title,
                'hybrid_score': round(float(job_info['score']), 4),
                'match_percentage': round(float(job_info['score']) * 100, 2),  # Convert to percentage
                'cosine_score': round(float(job_info['cosine_score']), 4),
                'rf_score': round(float(job_info['rf_score']), 4),
                'expanded_skills_used': expanded_skills  # Show what skills were actually used for matching
            }
            
            # Add skills information
            if 'all_skills' in data.columns:
                job_details['required_skills'] = str(data.iloc[idx]['all_skills'])
            
            # Add other relevant fields if they exist (though they might not be in this dataset)
            available_columns = ['department', 'location', 'company', 'Company', 'duration', 'stipend', 'description']
            for col in available_columns:
                if col in data.columns:
                    value = data.iloc[idx][col]
                    if pd.notna(value):  # Only add non-null values
                        job_details[col.lower()] = str(value)
            
            recommendations.append(job_details)
        
        return recommendations
    
    except Exception as e:
        # Log the error and return empty list
        print(f"Error in recommend_jobs: {str(e)}")
        import traceback
        traceback.print_exc()
        return []

def get_model_info():
    """
    Get information about the loaded models and data.
    Useful for debugging and verification.
    """
    try:
        vectorizer, rf_model, data = load_models()
        return {
            'vectorizer_type': type(vectorizer).__name__,
            'model_type': type(rf_model).__name__,
            'data_shape': data.shape,
            'data_columns': list(data.columns)
        }
    except Exception as e:
        return {'error': str(e)}