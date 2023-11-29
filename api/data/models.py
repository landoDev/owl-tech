"""
This file contains the data models in Python classes that would represent the structure of the data if it were to be stored in a PostgreSQL database.
The purpose of this file is to show how I would model the data; the actual logic of the app uses the csv file `stock-data.csv`
"""

# NOTE: table entity ids are `str` for UUIDs
class Stock:
    """ 
    Represents a stock. 
    Attributes:
        stock_id:  A unique identifier for the stock.
        name: A string representing the name of the stock. This serves as it's id
    """
    stock_id: str 
    name: str

class StockPrice:
    """ 
    Represents the stock price information. 
    Attributes:
        stock_price_id:  A unique identifier for the stock price entry.
        date: A datetime representing the date of the stock price.
        volume: An integer representing the volume of the stock.
        close_usd: A float representing the closing price of the stock in USD.
        stock: A string representing the foreign key to the stock associated with this stock price.
    """
    stock_price_id: str
    date: datetime
    volume: int
    close_usd: float
    stock_id: str

class SectorLevel:
    """ 
    Represents a sector level. 
    Attributes:
        sector_level_id:  A unique identifier for the sector level.
        one: A string representing the first level of the sector.
        two: A string representing the second level of the sector.
    """
    sector_level_id: str
    one: str
    two: str

class StockSectorLevel:
    """
    Represents the relationship between stocks and sector levels in a many-to-many relationship.
    Attributes:
        stock_sector_level_id:  A unique identifier for the stocks and sector levels entry.
        stock: The foreign key to the associated stock.
        sector_level: The foreign key to the levels one and two of the associated sector.
    """
    stock_sector_level_id: str
    stock_id: str
    sector_level_id: str


