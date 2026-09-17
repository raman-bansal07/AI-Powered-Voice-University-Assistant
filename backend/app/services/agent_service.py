"""
University Agent Orchestrator & Multilingual Grounding Engine.
Orchestrates Intent Guardrails, Dynamic Tools, RAG Ordinances, and Speech Services.
"""

import time
import logging
from typing import Dict, Any, Optional
from app.config import settings
from app.services.intent_guardrail import check_intent_guardrail
from app.services.rag_service import search_university_ordinances
from app.services.sarvam_service import synthesize_speech_sarvam
from app.tools.university_tools import (
    get_university_overview_and_ranking,
    check_library_status,
    find_faculty_contact,
    check_fee_deadlines
)

logger = logging.getLogger(__name__)

async def process_user_query(
    query_text: str,
    language_code: str = "hi-IN",
    user_role: str = "student",
    generate_audio: bool = True
) -> Dict[str, Any]:
    """
    Full pipeline processing:
    1. Intent Guardrail Check (Filters off-topic queries immediately)
    2. Intent & Tool Routing (Dynamic Tools vs RAG Ordinances)
    3. Tool / RAG Execution
    4. Multilingual Response Formulation
    5. Spoken Voice Synthesis (TTS)
    """
    start_time = time.time()
    q_lower = query_text.lower().strip()
    
    # -------------------------------------------------------------
    # Step 1: Intent Guardrail Check
    # -------------------------------------------------------------
    is_out_of_scope, redirect_msg, guardrail_telemetry = check_intent_guardrail(query_text, language_code)
    
    if is_out_of_scope:
        audio_base64 = None
        tts_telemetry = {}
        if generate_audio:
            audio_base64, tts_telemetry = await synthesize_speech_sarvam(redirect_msg, language_code)
            
        elapsed_ms = int((time.time() - start_time) * 1000)
        return {
            "status": "success",
            "query": query_text,
            "language": language_code,
            "response_text": redirect_msg,
            "audio_base64": audio_base64,
            "intent_route": "OUT_OF_SCOPE_GUARDRAIL",
            "is_out_of_scope": True,
            "tool_used": None,
            "citations": [],
            "telemetry": {
                "total_latency_ms": elapsed_ms,
                "guardrail": guardrail_telemetry,
                "tts": tts_telemetry
            }
        }

    # -------------------------------------------------------------
    # Step 2: Intent Classification & Routing (Tools vs RAG)
    # -------------------------------------------------------------
    tool_used = None
    citations = []
    response_text = ""
    
    # A. Check for University Overview / Ranking / Establishment Tool
    if any(k in q_lower for k in ["overview", "ranking", "rank", "nirf", "naac", "established", "establish", "kab bani", "kab establish", "found", "founder", "campus", "area", "history", "itihaas", "achieve", "accredit", "university kab"]):
        tool_used = "get_university_overview_and_ranking"
        tool_data = get_university_overview_and_ranking(q_lower)
        
        name = tool_data.get('name', 'The University')
        est = tool_data.get('established', 1985)
        if language_code == "hi-IN":
            response_text = (
                f"{name} की स्थापना वर्ष {est} में हुई थी। "
                f"यूनिवर्सिटी NAAC A++ (Score 3.82) मान्यता प्राप्त है और NIRF Engineering 2025 में भारत में 12वीं रैंक पर है। "
                f"यह 250 एकड़ के स्मार्ट ग्रीन कैंपस में स्थित है जिसमें 12 सेंटर ऑफ एक्सीलेंस और 94.8% प्लेसमेंट रिकॉर्ड है।"
            )
        elif language_code == "ta-IN":
            response_text = (
                f"{name} {est} il niruvapadathu. "
                f"NAAC A++ akikaram perrutullatu matrum NIRF 2025 il 12vatu idathil ullatu. "
                f"250 ekkar campus, 12 research centers matrum 94.8% placement record."
            )
        elif language_code == "te-IN":
            response_text = (
                f"{name} {est} lo sthaapinchabadindi. "
                f"NAAC A++ gaurtimpu mariyu NIRF 2025 lo 12va rank kaligundi. "
                f"250 ekarala campus lo 12 centers of excellence mariyu 94.8% placement record."
            )
        elif language_code == "mr-IN":
            response_text = (
                f"{name} ची स्थापना {est} मध्ये झाली. "
                f"NAAC A++ मान्यता आणि NIRF 2025 मध्ये 12वे स्थान. "
                f"250 एकरावर पसरलेला हरित कॅम्पस आणि 94.8% प्लेसमेंट रेकॉर्ड."
            )
        else: # English (en-IN) and all other languages
            response_text = (
                f"{name} was established in {est}. "
                f"It holds NAAC Grade A++ accreditation and is ranked #12 in India by NIRF Engineering 2025. "
                f"The 250-acre smart green campus houses 12 Centers of Excellence with a 94.8% placement record."
            )
            
        citations.append({
            "source_type": "Live University Directory & NIRF 2025 Gazette",
            "reference_id": "AITU-PUB-2025-01",
            "title": "University Institutional Ranking & Accreditation Portfolio",
            "section": "General Profile & NIRF Report"
        })

    # B. Check for Library Tool
    elif any(k in q_lower for k in ["library", "kitab", "pustak", "book", "shelf", "rack", "reading room", "clrs", "dsa", "algorithm"]):
        tool_used = "check_library_status"
        tool_data = check_library_status(q_lower)
        
        if tool_data.get("status") == "found":
            b = tool_data["books"][0]
            if language_code == "hi-IN":
                response_text = (
                    f"पुस्तकालय में '{b['title']}' की कुल {b['available_copies']} प्रतियां उपलब्ध हैं। "
                    f"यह पुस्तक {b['floor']}, {b['shelf_location']} पर रखी गई है। "
                    f"इसका डिजिटल ई-बुक संस्करण भी लाइब्रेरी पोर्टल पर उपलब्ध है।"
                )
            elif language_code == "ta-IN":
                response_text = (
                    f"நூலகத்தில் '{b['title']}' புத்தகத்தின் {b['available_copies']} பிரதிகள் உள்ளன. "
                    f"இது {b['floor']}, {b['shelf_location']} இல் வைக்கப்பட்டுள்ளது."
                )
            elif language_code == "te-IN":
                response_text = (
                    f"లైబ్రరీలో '{b['title']}' పుస్తకానికి సంబంధించి {b['available_copies']} కాపీలు అందుబాటులో ఉన్నాయి. "
                    f"ఇది {b['floor']}, {b['shelf_location']} వద్ద లభిస్తుంది."
                )
            else:
                response_text = (
                    f"'{b['title']}' has {b['available_copies']} physical copies available in the Central Library. "
                    f"Location: {b['floor']}, {b['shelf_location']}. Digital e-book access is also active on the ERP."
                )
        else:
            if language_code == "hi-IN":
                response_text = "माफ़ कीजिए, कैटलॉग में यह पुस्तक सीधे नहीं मिली। आप लाइब्रेरी काउंटर या डिजिटल ई-लाइब्रेरी पोर्टल पर देख सकते हैं।"
            else:
                response_text = "Sorry, that specific title was not found in the instant catalog. Please check at the Central Circulation Desk."
                
        citations.append({
            "source_type": "Central Library ILMS Database",
            "reference_id": "LIB-OPAC-LIVE",
            "title": "Central Library Online Public Access Catalog (OPAC)",
            "section": "Stack Management System"
        })

    # C. Check for Faculty Contact Tool
    elif any(k in q_lower for k in ["faculty", "professor", "teacher", "sir", "mam", "sharma", "nair", "ghosh", "deshmukh", "cabin", "office hour", "email"]):
        tool_used = "find_faculty_contact"
        tool_data = find_faculty_contact(name=query_text)
        
        fac = tool_data["faculty_list"][0]
        if language_code == "hi-IN":
            response_text = (
                f"{fac['name']} ({fac['designation']}, {fac['department']}) का केबिन {fac['cabin_location']} में है। "
                f"उनसे मिलने का समय: {fac['office_hours']} है। ईमेल: {fac['email']}."
            )
        elif language_code == "ta-IN":
            response_text = (
                f"{fac['name']} ({fac['department']}) கேபின் {fac['cabin_location']} இல் உள்ளது. "
                f"சந்திப்பு நேரம்: {fac['office_hours']}. மின்னஞ்சல்: {fac['email']}."
            )
        elif language_code == "te-IN":
            response_text = (
                f"{fac['name']} ({fac['department']}) క్యాబిన్ {fac['cabin_location']} లో ఉంది. "
                f"కలిసే సమయం: {fac['office_hours']}. ఈమెయిల్: {fac['email']}."
            )
        else:
            response_text = (
                f"{fac['name']} ({fac['designation']}, {fac['department']}) is located at {fac['cabin_location']}. "
                f"Office hours: {fac['office_hours']}. Email: {fac['email']}."
            )
            
        citations.append({
            "source_type": "University ERP Staff Directory",
            "reference_id": "HR-FAC-2025",
            "title": "Academic Staff & Faculty Workload Directory",
            "section": fac["department"]
        })

    # D. Check for Fee & Deadlines Tool
    elif any(k in q_lower for k in ["fee", "fees", "due date", "deadline", "last date", "penalty", "late fee", "tarikh", "paise", "rupaye"]):
        tool_used = "check_fee_deadlines"
        tool_data = check_fee_deadlines(semester=6)
        fee = tool_data["fee_details"]
        
        if language_code == "hi-IN":
            response_text = (
                f"{fee['fee_type']} जमा करने की अंतिम तिथि {fee['standard_due_date']} है (राशि: ₹{fee['amount']:,})। "
                f"विलंब शुल्क: 26 से 31 मार्च तक ₹500 तथा 1 से 5 अप्रैल तक ₹1,500 पेनल्टी लागू होगी। "
                f"भुगतान ईआरपी पोर्टल erp.university.edu.in पर ऑनलाइन कर सकते हैं।"
            )
        elif language_code == "ta-IN":
            response_text = (
                f"{fee['fee_type']} செலுத்த கடைசி தேதி {fee['standard_due_date']} (தொகை: ₹{fee['amount']:,}). "
                f"மார்ச் 26 முதல் தாமத கட்டணம் ₹500 வசூலிக்கப்படும். ERP போர்ட்டலில் ஆன்லைனில் செலுத்தலாம்."
            )
        elif language_code == "te-IN":
            response_text = (
                f"{fee['fee_type']} చెల్లించడానికి చివరి తేదీ {fee['standard_due_date']} (మొత్తం: ₹{fee['amount']:,}). "
                f"మార్చి 26 నుండి ₹500 లేట్ ఫీజు వర్తిస్తుంది. ERP పోర్టల్ ద్వారా ఆన్‌లైన్‌లో చెల్లించవచ్చు."
            )
        else:
            response_text = (
                f"The last date for {fee['fee_type']} is {fee['standard_due_date']} (Amount: ₹{fee['amount']:,}). "
                f"Late fee: ₹500 from March 26-31, and ₹1,500 from April 1-5. Pay online via the university ERP portal."
            )
            
        citations.append({
            "source_type": "Finance & Accounts Department Gazette",
            "reference_id": "FIN-SEM6-2026",
            "title": "Academic Year 2025-26 Fee Schedule & Surcharges",
            "section": "Clause 3.2 - Examination & Tuition Dues"
        })

    # E. Default to Knowledge RAG (University Ordinances on Attendance, Branch Change, Hostels, Refunds)
    else:
        tool_used = "rag_university_ordinances"
        rag_docs = search_university_ordinances(query_text, top_k=2)
        top_doc = rag_docs[0]
        
        if "attendance" in top_doc["category"]:
            if language_code == "hi-IN":
                response_text = (
                    "विश्वविद्यालय अध्यादेश (Ordinance Section 4.1) के अनुसार, परीक्षा में बैठने के लिए प्रत्येक विषय में न्यूनतम 75% उपस्थिति अनिवार्य है। "
                    "प्रमाणित मेडिकल आधार पर डीन अकादमिक द्वारा 10% तक (न्यूनतम 65%) की छूट दी जा सकती है। 65% से कम उपस्थिति होने पर 'FA' ग्रेड मिलता है।"
                )
            else:
                response_text = (
                    "As per University Ordinance Section 4.1, a minimum of 75% attendance is mandatory in each enrolled course to appear in examinations. "
                    "A concession up to 10% (minimum 65%) is permissible strictly on certified medical grounds. Attendance below 65% results in course detention ('FA' grade)."
                )
        elif "branch" in top_doc["category"]:
            if language_code == "hi-IN":
                response_text = (
                    "प्रथम वर्ष के बाद ब्रांच चेंज के लिए न्यूनतम 8.50 CGPA आवश्यक है और प्रथम व द्वितीय सेमेस्टर में कोई बैकलॉग नहीं होना चाहिए। "
                    "सीटों का आवंटन पूर्णतः मेरिट आधार पर किया जाता है।"
                )
            else:
                response_text = (
                    "Branch change after 1st year requires a minimum cumulative CGPA of 8.50 with zero backlogs in 1st & 2nd semesters. "
                    "Seat allocation is strictly merit-based against vacant seats."
                )
        elif "hostel" in top_doc["category"]:
            if language_code == "hi-IN":
                response_text = (
                    "हॉस्टल नियमों के अनुसार, रात्रि कर्फ्यू सामान्य दिनों में 9:30 PM तथा सप्ताहांत पर 10:30 PM है। "
                    "विश्वविद्यालय में रैगिंग पर पूर्ण प्रतिबंध (Zero Tolerance) है; दोषी पाए जाने पर तत्काल निष्कासन और पुलिस प्राथमिकी दर्ज की जाती है।"
                )
            else:
                response_text = (
                    "Hostel curfew is 9:30 PM on weekdays and 10:30 PM on weekends. "
                    "The campus enforces a strict Zero-Tolerance Anti-Ragging policy with immediate suspension and FIR for violations."
                )
        else:
            response_text = top_doc["content"]
            
        for doc in rag_docs:
            citations.append({
                "source_type": "Official University Academic Ordinances",
                "reference_id": doc["doc_id"],
                "title": doc["title"],
                "section": doc["section"]
            })

    # -------------------------------------------------------------
    # Step 3: Speech Synthesis (TTS Voice Generation)
    # -------------------------------------------------------------
    audio_base64 = None
    tts_telemetry = {}
    if generate_audio:
        audio_base64, tts_telemetry = await synthesize_speech_sarvam(response_text, language_code)
        
    elapsed_ms = int((time.time() - start_time) * 1000)
    
    return {
        "status": "success",
        "query": query_text,
        "language": language_code,
        "response_text": response_text,
        "audio_base64": audio_base64,
        "intent_route": "IN_SCOPE_UNIVERSITY_QUERY",
        "is_out_of_scope": False,
        "tool_used": tool_used,
        "citations": citations,
        "telemetry": {
            "total_latency_ms": elapsed_ms,
            "guardrail": guardrail_telemetry,
            "tool_or_rag": tool_used,
            "tts": tts_telemetry
        }
    }
