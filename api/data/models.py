"""
This file contains the data models in Python that would represent the structure of the data if it were to be stored in a PostgreSQL database.
The purpose of this file is to show how I would model the data; the actual logic of the app uses the csv file `stock-data.csv`
"""

# separate out and understand what these data points are, what repeats, what's relational? 
# create a series of classes as you would for a sqlalchemy implementation (without the HOF and such)

# a stock has a `name` as it's `id`
# that one stock has several dates (each day that passes)
# each stock's date is associated with it's volume worth at close in usd
# many stocks have one sector level (1 and 2)

class Stock:
    name: str

class StockPrice:
    date: str
    volume: int
    close_usd: float
    stock: str # the fk to the stock this associate with

class SectorLevel:
    one: str
    two: str
    stock: str # the fk to the stock this associate with
