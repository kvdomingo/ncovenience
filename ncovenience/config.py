import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

PYTHON_ENV = os.environ.get("FLASK_ENV", "production")

SECRET_KEY = os.environ.get("SECRET_KEY")

UNAVAILABLE_RESPONSE = "No data available."
