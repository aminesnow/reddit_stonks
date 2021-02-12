import datetime
import utils.db_connector as db
import requests
import json

date_time_str = 'Dec 2015'
date_time_obj = datetime.datetime.strptime(date_time_str, '%b %Y')

print('Date:', date_time_obj.date())


params = (
    ('period_type', 'annual'),
    ('statement_type', 'income-statement'),
    ('order_type', 'latest_right'),
    ('is_pro', 'false'),
)

response = requests.get('https://seekingalpha.com/symbol/ATNX/financials-data', params=params)

data = json.loads(response.content.decode('utf-8'))

print(data)