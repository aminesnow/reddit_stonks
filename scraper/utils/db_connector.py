import pymongo
import os
import utils.get_env as env

MONGO_USER = env.get_env("MONGO_USER")
MONGO_PASS = env.get_env("MONGO_PASS")
MONGO_URL = env.get_env("MONGO_URL")
MONGO_DB = env.get_env("MONGO_DB")
SOURCES = env.get_env("SOURCES")
DAYS = int(env.get_env("DAYS"))

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

def get_financials():
    return db["financials"]