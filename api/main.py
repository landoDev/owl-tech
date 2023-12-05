import os
from datetime import date
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from data.utils import read_csv_data, handle_cumulative_returns

app = FastAPI()
app_data = read_csv_data(filepath='data/stock-data.csv')

## ALLOW CORS ##
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


## RETURN TYPES ##
# NOTE: this mirrors how the csv is consumed and organized
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

class CumulativeReturns(BaseModel):
    entire_period: float
    cumulative_daily_returns: List[float]
    
@app.get("/")
async def root():
    return {"message": "I am Groot!"}

# NOTE: the version of pydantic FastApi relies on doesn't support custom root overwrite yet (so docs don't have `name` as key but `additonalPropX`)
@app.get("/stocks")
async def all_stocks() -> dict[str, Stock]: 
    """ 
    List all stock data. 

    Returns
    An object of objects representing data for each stock
    """
    return app_data

@app.get("/stocks/{name}")
async def retrieve_stock(name: str) -> Stock:
    """ 
    Retrieve data for a specific stock. 
    
    Parameters:
        - name (str): The name of the stock.

    Returns:
    Stock: An object representing the data for the specified stock.
        - stock_prices: List of stock price objects (day, volume, price as `close_usd`)
        - sector_level: Object of the sector level of the stock.
    """
    return app_data[name]
    
@app.get("/stocks/return/{name}")
async def calculate_return(name: str, date_start: str = '', date_end: str = '') -> CumulativeReturns:
    """ 
    Calculate cumulative returns between two dates.
    
    Returns cumulative return for all dates if no date query parameters are passed.
    Expects date to be formatted `YYYY-MM-DD`.

    Parameters:
        - name (str): The name of the stock.
        - date_start (str, optional): The start date for calculating cumulative returns (default: '').
        - date_end (str, optional): The end date for calculating cumulative returns (default: '').

    Returns:
    CumulativeReturns: An object representing the calculated cumulative returns.
        - entire_period: Cumulative return for the entire daterange given.
        - cumulative_daily_returns: List of float values of each return per day in the daterange given
    """
    return handle_cumulative_returns(name, date_start, date_end, filepath='data/stock-data.csv')
