import requests
import json

cookies = {
    'A1': 'd=AQABBEChEWACEMyduTp94bpydno6NpvoMlEFEgABAgHpEmD4YOUzb2UB9iMAAAcIPaERYO_-5Cg&S=AQAAAqDOX9mW0THaLjoxDGVgZow',
    'A3': 'd=AQABBEChEWACEMyduTp94bpydno6NpvoMlEFEgABAgHpEmD4YOUzb2UB9iMAAAcIPaERYO_-5Cg&S=AQAAAqDOX9mW0THaLjoxDGVgZow',
    'B': '2hp7uttg1389t&b=3&s=07',
    'GUC': 'AQABAgFgEulg-EIfDwRP',
    'PRF': 't%3DDOGE-USD%252BGME%252BAAPL',
    'APID': 'UPcb804aa1-6973-11eb-becc-02ae474dc1da',
    'A1S': 'd=AQABBEChEWACEMyduTp94bpydno6NpvoMlEFEgABAgHpEmD4YOUzb2UB9iMAAAcIPaERYO_-5Cg&S=AQAAAqDOX9mW0THaLjoxDGVgZow&j=GDPR',
    'thamba': '2',
    'APIDTS': '1612725208',
}

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:85.0) Gecko/20100101 Firefox/85.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Referer': 'https://finance.yahoo.com/screener/unsaved/e590e583-a91d-4409-942d-6f80bdffd0cd?offset=25&count=25',
    'Content-Type': 'application/json',
    'Origin': 'https://finance.yahoo.com',
    'DNT': '1',
    'Connection': 'keep-alive',
    'TE': 'Trailers',
}

params = (
    ('crumb', '5/aa1sowFUZ'),
    ('lang', 'en-US'),
    ('region', 'US'),
    ('formatted', 'true'),
    ('corsDomain', 'finance.yahoo.com'),
)


offset = 0

results = []

while (offset < 7037):
    data = {"size":50,"offset":offset,"sortField":"intradaymarketcap","sortType":"DESC","quoteType":"EQUITY","topOperator":"AND","query":{"operator":"AND","operands":[{"operator":"or","operands":[{"operator":"EQ","operands":["region","us"]}]},{"operator":"or","operands":[{"operator":"EQ","operands":["exchange","NAS"]},{"operator":"EQ","operands":["exchange","BSE"]},{"operator":"EQ","operands":["exchange","NGM"]},{"operator":"EQ","operands":["exchange","YHD"]},{"operator":"EQ","operands":["exchange","NCM"]},{"operator":"EQ","operands":["exchange","NMS"]},{"operator":"EQ","operands":["exchange","NYQ"]}]}]},"userId":"","userIdType":"guid"}
    resp = requests.post('https://query2.finance.yahoo.com/v1/finance/screener', headers=headers, params=params, cookies=cookies, json=data)
    j = json.loads(resp.content.decode('utf-8'))
    print(len(j["finance"]["result"][0]["quotes"]))
    results = results + j["finance"]["result"][0]["quotes"]
    offset = offset + 50
    print(offset)

print(len(results))
with open('./yahoo_tickers.json', 'w', encoding='utf-8') as json_file:
    json.dump(results, json_file, ensure_ascii=False)