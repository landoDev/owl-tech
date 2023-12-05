"""Unittests"""

import pandas as pd
from .utils import read_csv_data, _calculate_cumulative_returns

def test_read_csv_data():
    assert read_csv_data(filepath='stock-data.csv')

def test_calculate_cumulative_returns():
    dummy_data = {
        # 'Date': ['2015-09-21', '2015-09-22', '2015-09-23'],
        'Hyperion': [1966.969971, 1942.739990, 1938.760010], 
        'Dahl': [40.086960, 39.896111, 39.868851], 
        'Jakobs': [26.616798, 26.198639, 26.411180], 
    }
    dummy_df = pd.DataFrame.from_dict(dummy_data)
    entire_period_df, list_of_returns_df = _calculate_cumulative_returns(dummy_df)
    
    assert not entire_period_df.empty and not list_of_returns_df.empty
    assert entire_period_df['Hyperion'].tolist()[0] == -1.4341836131671282