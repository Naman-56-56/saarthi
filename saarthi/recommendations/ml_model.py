import joblib
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import os
from django.conf import settings

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
        
        # Step 1: Join skills into text and vectorize
        user_skills_text = ' '.join(user_skills)
        user_vector = vectorizer.transform([user_skills_text])
        
        # Step 2: Get job skills from data
        job_skills_columns = []
        for col in data.columns:
            if 'skill' in col.lower() or 'requirement' in col.lower() or 'technology' in col.lower():
                job_skills_columns.append(col)
        
        if not job_skills_columns:
            # Fallback: use a 'skills' column if it exists, or create a combined skills text
            if 'skills' in data.columns:
                job_skills_text = data['skills'].fillna('').astype(str)
            elif 'Skills' in data.columns:
                job_skills_text = data['Skills'].fillna('').astype(str)
            else:
                # Try to find any text column that might contain skills
                text_columns = data.select_dtypes(include=['object']).columns
                if len(text_columns) > 1:
                    # Combine all text columns except title/position columns
                    skill_cols = [col for col in text_columns if 'title' not in col.lower() and 'position' not in col.lower()]
                    if skill_cols:
                        job_skills_text = data[skill_cols].fillna('').apply(lambda x: ' '.join(x), axis=1)
                    else:
                        job_skills_text = data[text_columns].fillna('').apply(lambda x: ' '.join(x), axis=1)
                else:
                    raise ValueError("No suitable skills column found in the data")
        else:
            # Combine all skill-related columns
            job_skills_text = data[job_skills_columns].fillna('').apply(lambda x: ' '.join(x), axis=1)
        
        # Vectorize job skills
        job_vectors = vectorizer.transform(job_skills_text)
        
        # Step 3: Compute cosine similarity between user_vector and job skill vectors
        cosine_scores = cosine_similarity(user_vector, job_vectors).flatten()
        
        # Step 4: Get Random Forest predictions
        rf_probabilities = rf_model.predict_proba(user_vector)[0]  # Get probabilities for first (only) sample
        rf_classes = rf_model.classes_  # Get the class labels (job titles)
        
        # Create a mapping from job titles to RF probabilities
        rf_score_map = {}
        for i, job_title in enumerate(rf_classes):
            rf_score_map[job_title] = rf_probabilities[i]
        
        # Step 5: For each row in dataset, compute hybrid score
        hybrid_scores = []
        for idx in range(len(data)):
            # Get job title for this row
            job_title = ""
            if 'title' in data.columns:
                job_title = str(data.iloc[idx]['title'])
            elif 'Title' in data.columns:
                job_title = str(data.iloc[idx]['Title'])
            elif 'job_title' in data.columns:
                job_title = str(data.iloc[idx]['job_title'])
            elif 'Job Title' in data.columns:
                job_title = str(data.iloc[idx]['Job Title'])
            elif 'position' in data.columns:
                job_title = str(data.iloc[idx]['position'])
            elif 'Position' in data.columns:
                job_title = str(data.iloc[idx]['Position'])
            else:
                # Use the first text column as job title
                text_columns = data.select_dtypes(include=['object']).columns
                if len(text_columns) > 0:
                    job_title = str(data.iloc[idx][text_columns[0]])
                else:
                    job_title = f"Job {idx + 1}"
            
            # Get cosine score for this job
            cosine_score = cosine_scores[idx]
            
            # Get RF score for this job title (0 if missing)
            rf_score = rf_score_map.get(job_title, 0.0)
            
            # Calculate hybrid score: 0.6 * cosine_score + 0.4 * rf_score
            hybrid_score = 0.6 * cosine_score + 0.4 * rf_score
            
            hybrid_scores.append((idx, hybrid_score, job_title))
        
        # Step 6: Sort by hybrid_score and get top_n
        hybrid_scores.sort(key=lambda x: x[1], reverse=True)
        top_recommendations = hybrid_scores[:top_n]
        
        # Step 7: Prepare final recommendations with all available data
        recommendations = []
        for idx, hybrid_score, job_title in top_recommendations:
            job_details = {
                'title': job_title,
                'hybrid_score': float(hybrid_score)
            }
            
            # Add other relevant fields if they exist
            available_columns = ['department', 'location', 'company', 'Company', 'duration', 'stipend']
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