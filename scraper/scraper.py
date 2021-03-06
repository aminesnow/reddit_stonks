import praw 
import datetime
from datetime import datetime, timedelta
import re

from praw.reddit import Submission
import utils.db_connector as db
import utils.get_env as env

def utc_to_local(utc_dt):
    return datetime.fromtimestamp(utc_dt)


def isTickerFormat(word):
    isTicker = word.isupper() and (word.lower() != '$') and (
        not any(chr.isdigit() for chr in word.lower()))
    dolla = word.lower().startswith('$')

    formatted = re.sub(r'[^a-zA-Z]', '', word)
    # DD alone: means due diligence 99% of the time
    # ARE, FOR, ALL common english words used by the WSB smooth brained
    engWords = ['DD', 'ARE', 'FOR', 'ALL', 'NOW', 'NEXT', 'NEW', 'CAN', 'OUT',
                'ONE', 'HAS', 'SEE', 'STAY', 'FREE', 'OPEN', 'RIDE', 'POST', 'LIFE', 'PLAY',
                'USA', 'ANY', 'CASH', 'LOW', 'VERY', 'LOVE', 'GOOD', 'REAL', 'BEST', 'LIVE',
                'SAVE', 'RUN', 'MAN', 'FLY', 'EVER', 'WELL', 'HEAR', 'WORK', 'EAT', 'ELSE',
                'PLAN', 'TRUE', 'STAR', 'FAST', 'FUND', 'SHIP', 'HES', 'HOPE', 'THEY', 'HOLD',
                'APES', 'SOS', 'PUMP', 'DUMB', 'DUMP', 'BOOM', 'APPS', 'DOOR', 'FOLD', 'WOW',
                'SUN', 'TURN', 'NICE', 'CARE', 'IBKR', 'TELL', 'BEAT', 'CTO', 'TWO', 'INFO', 'TEAM',
                'MEN', 'DARE', 'MOD', 'AGO', 'FAT', 'SKY', 'MAX', 'WISH', 'HOME', 'ONTO', 'IRL', 'EYES',
                'KIDS', 'CAR', 'MASS', 'CRY', 'EOD', 'TECH', 'PSA', 'GAIN', 'FOX', 'KEY', 'PEAK', 'CUZ',
                'PLUS', 'GROW', 'MAIN', 'COLD', 'ALLY', 'TOWN', 'BRO', 'FAM', 'ROAD', 'FOUR', 'LEAP', 'BLUE',
                'BAND', 'SELF', 'SON', 'RACE', 'EXP', 'PRO', 'CORE', 'HUGE', 'CEO', 'BIG', 'ON', 'MOON']
    correctSize = len(formatted) in [3, 4] and formatted not in engWords

    return isTicker and (dolla or correctSize)



if __name__ == "__main__":
    SOURCES = env.get_env("SOURCES")
    DAYS = int(env.get_env("DAYS"))
    REDDIT_ID = env.get_env("REDDIT_ID")
    REDDIT_USER = env.get_env("REDDIT_USER")
    REDDIT_SECRET = env.get_env("REDDIT_SECRET")

    reddit = praw.Reddit(
        client_id=REDDIT_ID,
        client_secret=REDDIT_SECRET,
        user_agent="python:stonks:v1.0.0 (by u/{})".format(REDDIT_USER)
    )

    yh_tickers = db.get_yh_tickers()
    mentions = db.get_mentions()

    sources = SOURCES.split(':')

    date = datetime.today() - timedelta(days=DAYS)
    start_time = int(date.timestamp())

    count = 0
    for source in sources:
        print('crawling {}'.format(source))

        submissions = reddit.subreddit(source).new(limit=None)

        for submission in submissions:
            count = count +1 
            if (submission.created_utc >= start_time):
                title = submission.title
                words = title.split()
                # get possible tags in title
                tickers = list(
                    filter(lambda w: len(w) > 1 and (w not in ['GME', 'AMC', ]),  # GME and AMC are just spam at this point, no data value
                        map(lambda w: re.sub(r'[^a-zA-Z]', '', w),
                            filter(isTickerFormat, words)
                            )
                        )
                )

                if len(tickers) > 0:
                    for ticker in tickers:
                        # check if sym exists and if not already scraped
                        cnt_sym = yh_tickers.count_documents({"symbol": ticker})
                        cnt_exists = mentions.count_documents(
                            {"permalink": submission.permalink, "created_utc": submission.created_utc, "ticker": ticker})
                        if (cnt_sym > 0 and cnt_exists <= 0):
                            # save mention to db
                            mention = {
                                "reddit_id": submission.id,
                                "title": title,
                                "full_link": submission.url,
                                "permalink": submission.permalink,
                                "created_utc": submission.created_utc,
                                "created_date": utc_to_local(submission.created_utc),
                                "ticker": ticker,
                                "author": submission.author.name,
                                "source": source
                            }
                            mentions.insert_one(mention)
                            print('ticker inserted {} | Date: {}'.format(ticker, mention["created_date"]))
        print(count)
