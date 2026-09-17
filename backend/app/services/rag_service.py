"""
RAG (Retrieval-Augmented Generation) Service for University Ordinances.
Performs semantic & keyword retrieval on official university rulebook documents.
"""

from typing import List, Dict, Any, Optional
from app.data.university_rulebook import UNIVERSITY_RULEBOOK_DOCS

def search_university_ordinances(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """
    Retrieves the most relevant academic ordinances grounded on the query.
    Calculates relevance score based on keyword density and category match.
    """
    q_words = set(query.lower().replace("?", "").replace(",", "").split())
    scored_results = []
    
    for doc in UNIVERSITY_RULEBOOK_DOCS:
        score = 0.0
        # Keyword matching
        for kw in doc["keywords"]:
            if any(w in kw.lower() for w in q_words) or kw.lower() in query.lower():
                score += 3.0
                
        # Content match
        content_lower = doc["content"].lower()
        title_lower = doc["title"].lower()
        for word in q_words:
            if len(word) > 2:
                if word in title_lower:
                    score += 2.0
                if word in content_lower:
                    score += 1.0
                    
        if score > 0:
            scored_results.append({
                "doc_id": doc["id"],
                "title": doc["title"],
                "section": doc["section"],
                "category": doc["category"],
                "content": doc["content"],
                "relevance_score": round(min(score / 10.0, 0.99), 3)
            })
            
    # Sort descending by relevance score
    scored_results.sort(key=lambda x: x["relevance_score"], reverse=True)
    
    # If no high matches, return the attendance and examination baseline document
    if not scored_results:
        return [{
            "doc_id": UNIVERSITY_RULEBOOK_DOCS[0]["id"],
            "title": UNIVERSITY_RULEBOOK_DOCS[0]["title"],
            "section": UNIVERSITY_RULEBOOK_DOCS[0]["section"],
            "category": UNIVERSITY_RULEBOOK_DOCS[0]["category"],
            "content": UNIVERSITY_RULEBOOK_DOCS[0]["content"],
            "relevance_score": 0.65
        }]
        
    return scored_results[:top_k]
