"""
RAG Service — Azure AI Search (primary) + Local Keyword Fallback (secondary).
Retrieves relevant university ordinance documents for student queries.
"""

import httpx
import logging
from typing import List, Dict, Any
from app.config import settings
from app.data.university_rulebook import UNIVERSITY_RULEBOOK_DOCS

logger = logging.getLogger(__name__)

# ─────────────────────────────────────────────
# Local Keyword Search (always-available fallback)
# ─────────────────────────────────────────────

def _search_local(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """
    Keyword-based local retrieval on the in-memory rulebook.
    Used as fallback when Azure AI Search is unavailable.
    """
    q_words = set(query.lower().replace("?", "").replace(",", "").split())
    scored = []

    for doc in UNIVERSITY_RULEBOOK_DOCS:
        score = 0.0
        for kw in doc["keywords"]:
            if any(w in kw.lower() for w in q_words) or kw.lower() in query.lower():
                score += 3.0
        content_lower = doc["content"].lower()
        title_lower = doc["title"].lower()
        for word in q_words:
            if len(word) > 2:
                if word in title_lower:
                    score += 2.0
                if word in content_lower:
                    score += 1.0
        if score > 0:
            scored.append({
                "doc_id": doc["id"],
                "title": doc["title"],
                "section": doc["section"],
                "category": doc["category"],
                "content": doc["content"],
                "relevance_score": round(min(score / 10.0, 0.99), 3),
                "source": "local_keyword"
            })

    scored.sort(key=lambda x: x["relevance_score"], reverse=True)

    if not scored:
        return [{
            "doc_id": UNIVERSITY_RULEBOOK_DOCS[0]["id"],
            "title": UNIVERSITY_RULEBOOK_DOCS[0]["title"],
            "section": UNIVERSITY_RULEBOOK_DOCS[0]["section"],
            "category": UNIVERSITY_RULEBOOK_DOCS[0]["category"],
            "content": UNIVERSITY_RULEBOOK_DOCS[0]["content"],
            "relevance_score": 0.65,
            "source": "local_keyword_baseline"
        }]
    return scored[:top_k]


# ─────────────────────────────────────────────
# Azure AI Search (primary retrieval)
# ─────────────────────────────────────────────

async def _search_azure(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """
    Retrieves documents from Azure AI Search index (university-rulebook).
    """
    if not settings.AZURE_SEARCH_API_KEY or not settings.AZURE_SEARCH_ENDPOINT:
        return []

    url = (
        f"{settings.AZURE_SEARCH_ENDPOINT.rstrip('/')}"
        f"/indexes/{settings.AZURE_SEARCH_INDEX_NAME}/docs/search"
        f"?api-version=2024-07-01"
    )

    headers = {
        "api-key": settings.AZURE_SEARCH_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "search": query,
        "top": top_k,
        "queryType": "simple",
        "searchMode": "any",
        "select": "id,title,section,category,content"
    }

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, headers=headers, json=payload)
            if response.status_code == 200:
                data = response.json()
                results = []
                for item in data.get("value", []):
                    results.append({
                        "doc_id": item.get("id", "az-unknown"),
                        "title": item.get("title", ""),
                        "section": item.get("section", ""),
                        "category": item.get("category", ""),
                        "content": item.get("content", ""),
                        "relevance_score": round(min(item.get("@search.score", 0) / 10.0, 0.99), 3),
                        "source": "azure_ai_search"
                    })
                logger.info(f"Azure AI Search returned {len(results)} results")
                return results
            else:
                logger.warning(f"Azure Search HTTP {response.status_code}: {response.text[:200]}")
                return []
    except Exception as ex:
        logger.error(f"Azure Search exception: {str(ex)}")
        return []


# ─────────────────────────────────────────────
# Public API — Azure first, local fallback
# ─────────────────────────────────────────────

async def search_university_ordinances(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """
    Primary entry point for RAG retrieval.
    Tries Azure AI Search first; falls back to local keyword search.
    """
    if settings.AZURE_SEARCH_API_KEY:
        azure_results = await _search_azure(query, top_k)
        if azure_results:
            return azure_results
        logger.info("Azure Search returned empty — falling back to local keyword search")

    return _search_local(query, top_k)


def search_university_ordinances_sync(query: str, top_k: int = 2) -> List[Dict[str, Any]]:
    """Synchronous local-only search (for non-async contexts)."""
    return _search_local(query, top_k)
