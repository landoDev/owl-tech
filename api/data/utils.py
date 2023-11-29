from datetime import datetime, date
import csv
from pydantic import BaseModel


def read_csv_data() -> dict[str, dict[str, str]]:
    stock_data = {}
    with open('data/stock-data.csv', 'r') as csvdata:
        reader = csv.DictReader(csvdata)
        for row in reader:
            # strip whitespace and replace spaces for use as id's in api path parameters in `main.py`
            stock_id = row['name'].strip().replace(" ", "")
            stock_price = {
                "date": datetime.strptime(row['asof'], '%Y-%m-%d').date(),
                "volume": row['volume'],
                "close_usd": row['close_usd']
            }
            sector_level = {"one": row['sector_level1'], "two": row['sector_level2']}
            if not stock_id in stock_data:
                stock_data[stock_id] = { "stock_prices": [stock_price], "sector_level": sector_level }
            else:
                stock_data[stock_id]["stock_prices"].append(stock_price)
    return stock_data

