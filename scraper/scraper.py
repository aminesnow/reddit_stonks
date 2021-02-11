from psaw import PushshiftAPI
import datetime
from datetime import datetime, timedelta
import pymongo 
import os
import re

def utc_to_local(utc_dt):
    return datetime.fromtimestamp(utc_dt)

def isTickerFormat(word):
    isTicker = word.isupper() and (word.lower() != '$') and (not any(chr.isdigit() for chr in word.lower()))
    dolla = word.lower().startswith('$')

    formatted = re.sub(r'[^a-zA-Z]', '', word)
     # DD alone: means due diligence 99% of the time
     # ARE, FOR, ALL common english words used by the WSB smooth brained
    correctSize = len(formatted) in [3, 4, 5] and formatted not in ['DD', 'ARE', 'FOR', 'ALL']

    return isTicker and (dolla or correctSize)

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
dbUrl = 'mongodb://{}:{}@{}:27017/{}'.format(MONGO_USER, MONGO_PASS, MONGO_URL, MONGO_DB)
myclient = pymongo.MongoClient(dbUrl)

db = myclient[MONGO_DB]
yh_tickers = db["yh_tickers"]
mentions = db["mentions"]

sources = SOURCES.split(':')
api = PushshiftAPI()

date = datetime.today() - timedelta(days = DAYS)
start_time = int(date.timestamp())

for source in sources:
    print('crawling {}'.format(source))

    submissions = api.search_submissions(after=start_time,
                                        subreddit=source,
                            filter=['id', 'full_link', 'permalink','author', 'title', 'subreddit'])

    for submission in submissions:
        title = submission.title
        words = title.split()
        # get possible tags in title
        tickers = list(
            filter(lambda w: len(w) > 1 and (w not in ['GME', 'AMC',]), # GME and AMC are just spam at this point, no data value
                    map(lambda w: re.sub(r'[^a-zA-Z]', '', w),
                        filter(isTickerFormat, words)
                    )
                )
        )

        if len(tickers) > 0:
            for ticker in tickers:
                # check if sym exists and if not already scraped
                cnt_sym = yh_tickers.count_documents({"symbol": ticker})
                cnt_exists = mentions.count_documents({"permalink": submission.permalink, "created_utc": submission.created_utc, "ticker": ticker})
                if (cnt_sym > 0 and cnt_exists <= 0):
                    # save mention to db
                    mention = { 
                        "reddit_id": submission.id,
                        "title": title, 
                        "full_link": submission.full_link,
                        "permalink": submission.permalink,
                        "created_utc": submission.created_utc,
                        "created_date": utc_to_local(submission.created_utc),
                        "ticker": ticker,
                        "author": submission.author,
                        "source": submission.subreddit
                    }
                    mentions.insert_one(mention)
                    print('ticker inserted {} | Date: {}'.format(ticker, mention["created_date"]))