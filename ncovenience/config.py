import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

PYTHON_ENV = os.environ.get("PYTHON_ENV", "production")

SECRET_KEY = os.environ.get("SECRET_KEY")

UNAVAILABLE_RESPONSE = "No data available."

MAPBOX_ACCESS_TOKEN = os.environ.get("MAPBOX_ACCESS_TOKEN")
