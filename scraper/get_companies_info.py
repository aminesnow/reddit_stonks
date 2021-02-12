import json
import requests
import utils.db_connector as db
import utils.get.env as env

RAPIDAPI_KEY = env.get_env("RAPIDAPI_KEY")
RAPIDAPI_HOST = env.get_env("RAPIDAPI_HOST")


companies = db.get_companies()
mentions = db.get_mentions()
yh_tickers = db.get_yh_tickers()


def get_rapidapi_info(ticker):
    headers = {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST
    }
    response = requests.request("GET", "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary",
                                headers=headers, params={"symbol": ticker})
    info = json.loads(response.content.decode('utf-8'))

    company = {
        "symbol": ticker
    }
    if ("longName" in info["quoteType"]):
        company["longName"] = info["quoteType"]["longName"]
    elif ("shortName" in info["quoteType"]):
        company["shortName"] = info["quoteType"]["shortName"]


    if ("sector" in info["summaryProfile"]):
        company["sector"] = info["summaryProfile"]["sector"]

    if ("industry" in info["summaryProfile"]):
        company["industry"] = info["summaryProfile"]["industry"]

    if ("longBusinessSummary" in info["summaryProfile"]):
        company["longBusinessSummary"] = info["summaryProfile"]["longBusinessSummary"]

    if ("country" in info["summaryProfile"]):
        company["country"] = info["summaryProfile"]["country"]

    if ("website" in info["summaryProfile"]):
        company["website"] = info["summaryProfile"]["website"]

    return company


def insert_doc(company):
    res = companies.insert_one(company)
    print('inserted {} info. id: {}'.format(ticker, res.inserted_id))


# get all tickers in database
tickers = mentions.distinct('ticker')

api_calls = 0
CALLS_LIMIT = 300

for ticker in tickers:
    count = companies.count_documents({"symbol": ticker})

    if (count == 0) and api_calls < CALLS_LIMIT:
        params = (
            ('formatted', 'true'),
            ('crumb', '5/aa1sowFUZ'),
            ('lang', 'en-US'),
            ('region', 'US'),
            ('modules', 'assetProfile,secFilings'),
            ('corsDomain', 'finance.yahoo.com'),
        )

        resp = requests.get('https://query1.finance.yahoo.com/v10/finance/quoteSummary/{}'.format(ticker),
                            params=params)

        try:
            info = json.loads(resp.content.decode('utf-8'))

            company = {}
            if (info is not None
                and info["quoteSummary"] is not None
                and info["quoteSummary"]["result"] is not None
                and info["quoteSummary"]["result"][0] is not None
                and "assetProfile" in info["quoteSummary"]["result"][0]):

                company = {
                    "longName": ticker,
                    "symbol": ticker
                }
                if ("longBusinessSummary" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["longBusinessSummary"] = info["quoteSummary"]["result"][0]["assetProfile"]["longBusinessSummary"]

                if ("city" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["city"] = info["quoteSummary"]["result"][0]["assetProfile"]["city"]

                if ("sector" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["sector"] = info["quoteSummary"]["result"][0]["assetProfile"]["sector"]

                if ("industry" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["industry"] = info["quoteSummary"]["result"][0]["assetProfile"]["industry"]
                
                if ("country" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["country"] = info["quoteSummary"]["result"][0]["assetProfile"]["country"]

                if ("website" in info["quoteSummary"]["result"][0]["assetProfile"]):
                    company["website"] = info["quoteSummary"]["result"][0]["assetProfile"]["website"]

                yh_comp = yh_tickers.find_one({"symbol": ticker}, {"longName": 1})
                company["longName"] = yh_comp["longName"]
        
            else:
                print('error: no public results found for {}'.format(ticker))
                company = get_rapidapi_info(ticker)
                api_calls = api_calls + 1

            insert_doc(company)
            print('api_calls: {}'.format(api_calls))

        except:
            print('An exception occurred on public results found for {}'.format(ticker)) 
            company = get_rapidapi_info(ticker)
            api_calls = api_calls + 1
            insert_doc(company)
            print('api_calls: {}'.format(api_calls))
