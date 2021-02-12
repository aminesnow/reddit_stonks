import pymongo
import os
if os.getenv("ENV") != 'production':
    from dotenv import load_dotenv
    from pathlib import PurePath

    # get env variables
    env_path = PurePath('./.env')
    load_dotenv(dotenv_path=env_path)

MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASS = os.getenv("MONGO_PASS")
MONGO_URL = os.getenv("MONGO_URL")
MONGO_DB = os.getenv("MONGO_DB")
SOURCES = os.getenv("SOURCES")
DAYS = int(os.getenv("DAYS"))

# connect to db
dbUrl = 'mongodb://{}:{}@{}:27017/{}'.format(
    MONGO_USER, MONGO_PASS, MONGO_URL, MONGO_DB)
myclient = pymongo.MongoClient(dbUrl)

db = myclient[MONGO_DB]

def get_db_client():
    return db

def get_companies():
    return db["companies"]


def get_yh_tickers():
    return db["yh_tickers"]
    

def get_mentions():
    return db["mentions"]