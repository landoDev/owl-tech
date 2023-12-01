from datetime import datetime, date, timedelta
import csv
from typing import Tuple

import numpy as np
import pandas as pd
from pydantic import BaseModel


def read_csv_data(filepath: str = 'stock-data.csv') -> dict[str, dict[str, str]]:
    stock_data = {}
    with open(filepath, 'r') as csvdata:
        reader = csv.DictReader(csvdata)
        for row in reader:
            # strip whitespace and replace spaces for use as id's in api path parameters in `main.py`
            stock_id = row['name'].strip().replace(" ", "")
            stock_price = {
                "date": row['asof'],
                "volume": row['volume'],
                "close_usd": row['close_usd']
            }
            sector_level = {"one": row['sector_level1'], "two": row['sector_level2']}
            if not stock_id in stock_data:
                stock_data[stock_id] = { "stock_prices": [stock_price], "sector_level": sector_level }
            else:
                stock_data[stock_id]["stock_prices"].append(stock_price)
    return stock_data

def handle_cumulative_returns(name: str, date_from: str = '', date_to:str = '', filepath: str = 'stock-data.csv') -> dict[float, list]:
    # read stock data into dataframes to organize then calculate the cumulative returns for the entire date range and the daily returns
    returns_dataframe = _prepare_data_for_returns(name, filepath, date_from, date_to)
    if returns_dataframe is None or returns_dataframe.empty:
        return {}
    (df_entire_period, df_daily_returns) = _calculate_cumulative_returns(returns_dataframe)
    # I know that if the entire period will be just one value, so we can hardcode the index for the scope of this
    return {"entire_period": df_entire_period[name].tolist()[0], "cumulative_daily_returns": df_daily_returns[name].tolist()}


## PRIVATE UTILS ##
def _prepare_data_for_returns(name: str, filepath: str, date_from: str = '', date_to:str = '') -> pd.DataFrame:
    df = pd.read_csv(filepath)
    df = df[['asof', 'name', 'close_usd']]
    df.columns = ['date', 'name', 'price']
    # our endpoint needs the asset names to be stripped and have no spaces. applying lambda so we can filter later
    df['name'] = df['name'].apply(lambda x: x.strip().replace(" ", ""))
    df = df[(df['name'] == name)]
    # only include data of the stock name and the daterange from the input, if both are passed
    if date_from and date_to:
        df = df[(df['date'] > date_from) & (df['date'] < date_to)]
    # pivot the data to make the stock name the column
    df1 = df.pivot_table(index=['date'], columns='name', values=['price'])
    df1.columns = [col[1] for col in df1.columns.values]

    # drop any dates with no data
    df1 = df1.dropna()
    if df1.empty:
        print("No data in daterange") 
        raise Exception("No data in daterange")
    
    return df1

def _calculate_cumulative_returns(dataframe: pd.DataFrame) -> Tuple[pd.DataFrame, pd.DataFrame]:
    df_daily_returns = dataframe.pct_change()
    # skip first row with NA
    df_daily_returns = df_daily_returns[1:]
    df_cumulative_returns = (1 + df_daily_returns).cumprod() - 1
    df_cumulative_returns = df_cumulative_returns.reset_index()
    df_entire_period_return = df_cumulative_returns.iloc[:, 1:].tail(1) * 100

    return (df_entire_period_return, df_cumulative_returns)
