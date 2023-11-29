from datetime import datetime, date
from fastapi import FastAPI
from pydantic import BaseModel, Field
from data.utils import read_csv_data
from typing import Dict, List, TypedDict

app = FastAPI()
app_data = read_csv_data()

## RETURN TYPES ##
# NOTE this mirrors how the csv is consumed and organized and is not a perfect representation of what the db models would look like
class SectorLevel(BaseModel):
    one: str
    two: str
class StockPrice(BaseModel):
    date: date
    volume: int
    close_usd: float

class Stock(BaseModel):
    stock_prices: List[StockPrice]
    sector_level: SectorLevel
    
@app.get("/")
async def root():
    return {"message": "I am Groot!"}

# NOTE: the version of pydantic FastApi relies on doesn't support custom root overwrite yet (so docs don't have `name` as key but `additonalPropX`)
@app.get("/stocks")
async def all_stocks() -> dict[str, Stock]: 
    """ List all stock data. """
    return app_data

@app.get("/stocks/{name}")
async def retrieve_stock(name: str) -> Stock:
    """ Retrieve data for a specific asset. """
    return app_data[name]
    
@app.get("/stocks/return/{name}")
## rely on query params? <- rely on query params for the date range
async def calculate_return(name: str, date_start: str, date_end: str):
    """ Calculate cumulative returns between two dates. """
    asset_prices: list = app_data[name]["stock_prices"]
    # filter list of asset_prices to just the daterange
    # make sure it's in order
    # double check what a cumulative return is
    # take the two dates on the edge of each range and do the math
    return "under construction"
