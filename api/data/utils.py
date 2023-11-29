import pandas as pd
# dont use pandas, iterating through it is an anti-pattern and I want to build a hash to pull from in the api
df = pd.read_csv('stock-data.csv')
print(df)
# def read_csv_data():
#     df = pd.read('stock-data')
#     print(df)

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