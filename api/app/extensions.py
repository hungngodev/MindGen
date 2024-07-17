from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase,relationship

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

import json
from typing import Any
from Crypto.Protocol.KDF import HKDF # pip install pycryptodome
from Crypto.Hash import SHA256 
from jose import jwe # pip install python-jose
from dotenv import load_dotenv
import os
load_dotenv()

def getDerivedEncryptionKey(secret: str) -> Any:
    # Think about including the context in your environment variables.
    context = str.encode("NextAuth.js Generated Encryption Key") 
    return HKDF(
        master=secret.encode(),
        key_len=32,
        salt="".encode(),
        hashmod=SHA256,
        num_keys=1,
        context=context,
    )


def get_token(token: str) -> dict[str, Any]:
    '''
    Get the JWE payload from a NextAuth.js JWT/JWE token in Python

    Steps:
    1. Get the encryption key using HKDF defined in RFC5869
    2. Decrypt the JWE token using the encryption key
    3. Create a JSON object from the decrypted JWE token
    '''
    # Retrieve the same JWT_SECRET which was used to encrypt the JWE token on the NextAuth Server
    print(os.getenv("NEXT_AUTH_SECRET"))
    jwt_secret = os.getenv("NEXT_AUTH_SECRET")
    encryption_key = getDerivedEncryptionKey(jwt_secret)
    payload_str = jwe.decrypt(token, encryption_key).decode()
    payload: dict[str, Any] = json.loads(payload_str)
    
    return payload
print(get_token("eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..fOSvqHvQWWg5TsiF.wYRvcZVB0TqVZQ4SAkf2mbj7paZS1DRhHE4-D12xsw0cBtHFWDaP-gW6LkzCDDD9Fp6C9ykbVbUN7w2m2kAyaiuKrbLt86zGAJMSHVTZk20FpGLYcHeiy_UzF3mah00gmcTxt9f3BFJbMbRekD-lyzNReeT7YBMccFOYU1YLPgnf0ej4UuKrf0A4C7rchSCzIjgatclcv_FeE57nDxjigC-G1TanQDtxzUa3l-D1EukkFvnMsMpyPLF86oTrnYElZzQ1GsfnQ_i4XA3G3vp2TXoDcUyMJI8ZCzmQuuxAs5jJ7gRt2PJ0GitwHm7dGv-4lOXXEO_sEuwzmpU-M-T4Nd5myFJ4XYD2QQj0XwMw7BG5NLA.BJBktilFFTVQXhT-LPkdNA"))