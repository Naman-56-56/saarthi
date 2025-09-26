from django.core.paginator import Paginator
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Internship  # Import the Internship model
from .ml_model import recommend_jobs
from django.contrib.auth import logout

def internships_api(request):
    if request.method == 'GET':
        # Fetch internships from the database
        internships = list(Internship.objects.values(
            "title",
            "department",
            "location",
            "duration",
            "stipend",
            "skills",
            "featured",
        ))

        # Pagination
        page = int(request.GET.get('page', 1))
        page_size = int(request.GET.get('page_size', 10))
        paginator = Paginator(internships, page_size)

        # Handle invalid page numbers gracefully
        if page > paginator.num_pages:
            # Return empty results for pages beyond the last page
            return JsonResponse({
                "internships": [],
                "total": paginator.count,
                "page": page,
                "page_size": page_size,
                "has_next": False,
            })
        
        try:
            internships_page = paginator.page(page)
        except:
            return JsonResponse({"error": "Invalid page number"}, status=400)

        return JsonResponse({
            "internships": list(internships_page),
            "total": paginator.count,
            "page": page,
            "page_size": page_size,
            "has_next": internships_page.has_next(),
        })
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
@require_http_methods(["POST"])
def recommend_api(request):
    """
    API endpoint for job recommendations using a hybrid recommendation model.
    
    The hybrid model combines:
    - Cosine similarity (60% weight): Based on TF-IDF vectorization of skills
    - Random Forest predictions (40% weight): ML model trained on job-skill patterns
    
    Final hybrid_score = 0.6 * cosine_score + 0.4 * rf_score
    
    Expected POST body:
    {
        "skills": ["Python", "HTML", "CSS"],
        "top_n": 3  // optional, defaults to 3
    }
    
    Returns:
    {
        "recommendations": [
            {
                "title": "Job Title",
                "hybrid_score": 0.85,
                "department": "Engineering",
                "location": "Remote",
                "company": "Company Name",
                "duration": "6 months",
                "stipend": "$1000",
                ...
            }
        ],
        "status": "success",
        "input_skills": ["Python", "HTML", "CSS"],
        "total_recommendations": 3
    }
    """
    try:
        # Parse JSON body
        body = json.loads(request.body.decode('utf-8'))
        
        # Validate input
        if 'skills' not in body:
            return JsonResponse({
                "error": "Missing 'skills' field in request body",
                "status": "error"
            }, status=400)
        
        skills = body['skills']
        
        # Validate skills is a list
        if not isinstance(skills, list):
            return JsonResponse({
                "error": "'skills' must be a list of strings",
                "status": "error"
            }, status=400)
        
        # Validate skills are not empty
        if not skills or len(skills) == 0:
            return JsonResponse({
                "error": "Skills list cannot be empty",
                "status": "error"
            }, status=400)
        
        # Clean and filter skills (remove empty strings)
        cleaned_skills = [skill.strip() for skill in skills if skill.strip()]
        
        if not cleaned_skills:
            return JsonResponse({
                "error": "No valid skills provided",
                "status": "error"
            }, status=400)
        
        # Get top_n parameter (default to 3)
        top_n = body.get('top_n', 3)
        
        # Call ML recommendation function
        recommendations = recommend_jobs(cleaned_skills, top_n=top_n)
        
        return JsonResponse({
            "recommendations": recommendations,
            "status": "success",
            "input_skills": cleaned_skills,
            "total_recommendations": len(recommendations)
        })
    
    except json.JSONDecodeError:
        return JsonResponse({
            "error": "Invalid JSON in request body",
            "status": "error"
        }, status=400)
    
    except Exception as e:
        return JsonResponse({
            "error": f"Internal server error: {str(e)}",
            "status": "error"
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def logout_api(request):
    """
    API endpoint for logging out a user.

    Returns:
    {
        "message": "Successfully logged out",
        "status": "success"
    }
    """
    try:
        logout(request)
        return JsonResponse({
            "message": "Successfully logged out",
            "status": "success"
        })
    except Exception as e:
        return JsonResponse({
            "error": f"Internal server error: {str(e)}",
            "status": "error"
        }, status=500)

# Create your views here.
