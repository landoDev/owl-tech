"""
This file contains the data models in Python that would represent the structure of the data if it were to be stored in a PostgreSQL database.
The purpose of this file is to show how I would model the data; the actual logic of the app uses the csv file `stock-data.csv`
"""

# TODO: review me for validity
# a stock has a `name` as it's `id`
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

class StockSectorLevel:
    # many-to-many
    stock: str # fk
    sector_level_one: str #fk


