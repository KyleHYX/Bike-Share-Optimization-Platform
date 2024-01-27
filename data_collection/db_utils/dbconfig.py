import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATABASE_NAME = 'test1.db'
DATABASE_URL = os.path.join(BASE_DIR, DATABASE_NAME)