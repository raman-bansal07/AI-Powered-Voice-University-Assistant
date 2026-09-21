"""
Telemetry Module — Tracks API usage, query counts, and tool hits in-memory.
Data persists across requests within a single server session.
Saved to a JSON file for cross-restart persistence.
"""

import json
import os
import logging
from datetime import datetime, date
from typing import Dict, Any
from pathlib import Path

logger = logging.getLogger(__name__)

TELEMETRY_FILE = Path(__file__).parent.parent / "telemetry_data.json"

# ─────────────────────────────────────────
# In-Memory Store
# ─────────────────────────────────────────
_store: Dict[str, Any] = {
    "daily_queries": {},       # {"2025-09-22": 15}
    "tool_hits": {             # tool usage counts
        "rag_university_ordinances": 0,
        "get_university_overview_and_ranking": 0,
        "check_library_status": 0,
        "find_faculty_contact": 0,
        "check_fee_deadlines": 0,
        "out_of_scope": 0,
    },
    "service_calls": {          # total calls per provider
        "sarvam_stt": 0,
        "sarvam_tts": 0,
        "azure_speech_tts": 0,
        "azure_openai": 0,
        "azure_search": 0,
    },
    "daily_service_calls": {},  # {"2025-09-22": {"sarvam_stt": 3, ...}}
    "total_queries": 0,
    "indexed_pdfs": [],         # list of indexed PDF filenames
}


def _today() -> str:
    return date.today().isoformat()


def _load():
    """Load telemetry from disk if available."""
    global _store
    if TELEMETRY_FILE.exists():
        try:
            with open(TELEMETRY_FILE, "r", encoding="utf-8") as f:
                saved = json.load(f)
                # Merge saved data into store (keep defaults for missing keys)
                for key in _store:
                    if key in saved:
                        _store[key] = saved[key]
            logger.info("Telemetry data loaded from disk.")
        except Exception as e:
            logger.warning(f"Could not load telemetry: {e}")


def _save():
    """Persist telemetry to disk."""
    try:
        with open(TELEMETRY_FILE, "w", encoding="utf-8") as f:
            json.dump(_store, f, indent=2, ensure_ascii=False)
    except Exception as e:
        logger.warning(f"Could not save telemetry: {e}")


def record_query(tool_used: str = "rag_university_ordinances", is_out_of_scope: bool = False):
    """Record a completed query with its tool used."""
    today = _today()
    _store["total_queries"] += 1
    _store["daily_queries"][today] = _store["daily_queries"].get(today, 0) + 1

    if is_out_of_scope:
        _store["tool_hits"]["out_of_scope"] = _store["tool_hits"].get("out_of_scope", 0) + 1
    else:
        _store["tool_hits"][tool_used] = _store["tool_hits"].get(tool_used, 0) + 1

    _save()


def record_service_call(service: str):
    """Record an API call to a specific service."""
    today = _today()
    _store["service_calls"][service] = _store["service_calls"].get(service, 0) + 1

    if today not in _store["daily_service_calls"]:
        _store["daily_service_calls"][today] = {}
    _store["daily_service_calls"][today][service] = (
        _store["daily_service_calls"][today].get(service, 0) + 1
    )
    _save()


def add_indexed_pdf(filename: str):
    """Register a newly indexed PDF."""
    if filename not in _store["indexed_pdfs"]:
        _store["indexed_pdfs"].append(filename)
        _save()


def get_stats() -> Dict[str, Any]:
    """Return full stats for the admin dashboard."""
    today = _today()
    # Last 7 days of queries
    from datetime import timedelta
    last_7 = {}
    for i in range(6, -1, -1):
        d = (date.today() - timedelta(days=i)).isoformat()
        last_7[d] = _store["daily_queries"].get(d, 0)

    today_services = _store["daily_service_calls"].get(today, {})

    return {
        "total_queries": _store["total_queries"],
        "today_queries": _store["daily_queries"].get(today, 0),
        "last_7_days": last_7,
        "tool_hits": dict(_store["tool_hits"]),
        "service_calls_total": dict(_store["service_calls"]),
        "service_calls_today": today_services,
        "indexed_pdfs": list(_store["indexed_pdfs"]),
    }


# Load saved data on module import
_load()
