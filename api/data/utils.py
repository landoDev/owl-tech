from datetime import datetime, date
import csv
from pydantic import BaseModel
from typing import List

# import pandas as pd
# # dont use pandas, iterating through it is an anti-pattern and I want to build a hash to pull from in the api
# df = pd.read_csv('stock-data.csv')
# print(df)

class SectorLevel(BaseModel):
    one: str
    two: str
class StockPrice(BaseModel):
    date: date
    volume: int
    close_usd: float

class Stock(BaseModel):
    name: str
    stock_prices: List[StockPrice]
    sector_level: SectorLevel


def read_csv_data():
    stock_data = {}
    # without pydantic
    with open('stock-data.csv', 'r') as csvdata:
        reader = csv.DictReader(csvdata)
        for row in reader:
            stock_id = row['name']
            stock_price = {
                "date": datetime.strptime(row['asof'], '%Y-%m-%d').date(),
                "volume": row['volume'],
                "close_usd": row['close_usd']
            }
            sector_level_model = SectorLevel(one=row['sector_level1'], two=row['sector_level2'])
            print(sector_level_model.one)
            sector_level = {"one": row['sector_level1'], "two": row['sector_level2']}
            if not stock_id in stock_data:
                stock_data[stock_id] = { "stock_prices": [stock_price], "sector_level": sector_level_model }
            else:
                stock_data[stock_id]["stock_prices"].append(stock_price)
    print(stock_data)
def read_csv_data():
    stock_data = {}
    # with pydantic
    with open('stock-data.csv', 'r') as csvdata:
        reader = csv.DictReader(csvdata)
        for row in reader:
            stock_id = row['name']
            
            stock_price = StockPrice(
                date=datetime.strptime(row['asof'], '%Y-%m-%d').date(),
                volume=row['volume'],
                close_usd= row['close_usd']
            )
            sector_level = SectorLevel(one=row['sector_level1'], two=row['sector_level2'])
            if not stock_id in stock_data:
                stock_data[stock_id] = { "stock_prices": [stock_price], "sector_level": sector_level }
            else:
                stock_data[stock_id]["stock_prices"].append(stock_price)
    print(stock_data)
read_csv_data()

# data structure without rdb:
# {
#     stock: {
#         stock_price
#         sector_level
#     },
#     stock: {
#         stock_price
#         sector_level
#     }, 
# }