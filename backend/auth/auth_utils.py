from datetime import datetime, timedelta
from jose import jwt
import hashlib

SECRET_KEY = "aadya_secret"
ALGORITHM = "HS256"


# ✅ SAME hashing as CRUD (VERY IMPORTANT)
def hash_password(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(plain, hashed):
    return hashlib.sha256(plain.encode()).hexdigest() == hashed


# ✅ JWT Token
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=1)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)