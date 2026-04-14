import re
import PyPDF2
import io
from rapidfuzz import fuzz
import os

client = None

def extract_skills_with_ai(text: str):
    return []


def match_skills_with_fuzzy(text: str, skills_from_db: list, threshold: int = 80):
    text_lower = text.lower()
    found_skills = []

    for skill in skills_from_db:
        skill_name = skill["name"]
        skill_type = skill["type"]

        skill_lower = skill_name.lower()

        if skill_lower in text_lower:
            found_skills.append(skill)
            continue

        for word in text_lower.split():
            if fuzz.partial_ratio(skill_lower, word) >= threshold:
                found_skills.append(skill)
                break

    return found_skills


# ✅ Global Regex (ONLY here)
EMAIL_REGEX = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
EXPERIENCE_REGEX = r'(\d+)\s*(?:\+)?\s*(years?|yrs?)'


DEPARTMENT_KEYWORDS = {
    "IT Support": ["computer", "software", "hardware", "internet", "password", "system", "email", "bug", "crash"],
    "HR": ["payroll", "leave", "salary", "recruitment", "benefit", "policy", "employee"],
    "Finance": ["invoice", "payment", "billing", "refund", "tax", "budget", "expense"],
    "General": []
}


def extract_text_from_pdf(pdf_content: bytes) -> str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_content))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text() or ""
    return text


def extract_candidate_info(text: str, skills_from_db: list):
    # ✅ Email extraction
    email_match = re.search(EMAIL_REGEX, text)
    email = email_match.group(0) if email_match else "N/A"

    # ✅ Experience extraction (FIXED)
    exp_matches = re.findall(EXPERIENCE_REGEX, text.lower())
    experience = max([int(e[0]) for e in exp_matches]) if exp_matches else 0

    # 🔥 Rule-based skills
    matched_skills = match_skills_with_fuzzy(text, skills_from_db)

    # 🔥 AI skills (disabled)
    ai_skills = extract_skills_with_ai(text)

    # 🔥 Merge both
    final_skills = matched_skills.copy()

    for ai_skill in ai_skills:
        for db_skill in skills_from_db:
            if ai_skill.lower() in db_skill["name"].lower():
                if db_skill not in final_skills:
                    final_skills.append(db_skill)

    return {
        "email": email,
        "skills": final_skills,
        "experience": experience
    }


def calculate_score(skills: list, experience: int) -> float:
    score = 0

    required_total = 0
    required_matched = 0

    for skill in skills:
        # Handle both dict (with type) and string (fallback)
        if isinstance(skill, dict):
            skill_type = skill.get("type", "optional")
        elif isinstance(skill, str):
            skill_type = "optional"
        else:
            continue

        if skill_type == "required":
            score += 20
            required_matched += 1
            required_total += 1

        elif skill_type == "optional":
            score += 10

        elif skill_type == "bonus":
            score += 5

    score += min(experience * 5, 25)

    if required_total > 0:
        ratio = required_matched / required_total
        score *= ratio

    return round(score, 2)


def determine_status(score: float, experience: int) -> str:
    if score >= 60:
        return "Shortlisted"
    elif score >= 40:
        return "Review"
    return "Rejected"


from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
import os.path
import base64
from email.message import EmailMessage

SCOPES = ['https://www.googleapis.com/auth/gmail.modify']


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN_PATH = os.path.join(BASE_DIR, "token.json")

def send_email_gmail(to_email: str, subject: str, content: str):
    if not to_email or to_email == "N/A" or "@" not in to_email:
        print(f"⚠️ Invalid recipient email address: {to_email}. Skipping send.")
        return False

    creds = None
    if os.path.exists(TOKEN_PATH):
        creds = Credentials.from_authorized_user_file(TOKEN_PATH, SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            print(f"Gmail API not configured. Would have sent to {to_email}: {content}")
            return False

    try:
        service = build('gmail', 'v1', credentials=creds)
        message = EmailMessage()
        message.set_content(content)
        message['To'] = to_email
        message['From'] = 'me'
        message['Subject'] = subject

        encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

        create_message = {'raw': encoded_message}

        send_message = service.users().messages().send(
            userId="me", body=create_message
        ).execute()

        print(f'Message Id: {send_message["id"]}')
        return True

    except Exception as error:
        print(f'An error occurred: {error}')
        return False


def route_complaint(description: str) -> str:
    description_lower = description.lower()
    for dept, keywords in DEPARTMENT_KEYWORDS.items():
        if any(keyword in description_lower for keyword in keywords):
            return dept
    return "General"
