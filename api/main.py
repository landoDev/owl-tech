from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "I am Groot!"}

# TODO: Scratch pad for endpoints based on requirements (this is indpendent of how I would model it). PANDASSSSSSSSSS YAAAAAAAAASSSSS
# NOTE: reminder to myself: the data models and actual implementation are divorced from each other. they do not and should not relate per reqs
# however, speaking on above, it may help visualize how to handle the dataframe ops for each endpoint
# any utils or pandas usage will start in here but as I grow out the endpoints lets assess if a util file will be cleaner in the polish run (prob will be)

# list all stock data
## how should this be presented? Like the csv just in UI form??
# @app.get("/")
# async def all_stocks():
    # pass

# retrieve data for a specific asset
## what is an asset? how do I identify each stock/row in the data csv?
## answer: an asset is a `name`` and it's most up-to-date data points
# @app.get("/asset/{name}")
# async def retrieve_asset(name: str):
#     pass
    
# calculate cumulative returns between two dates
## does this mean each stock
## prob need to have one stock and for each date in with that stock name, add or subtract
# @app.get("/asset/return/{name}")
## rely on query params? <- rely on query params for the date range
# async def calculate_return(name: str, date_start: str, date_end: str):
#     pass

# NOTE: stock `name` is the id, so one stock can be represented in many dates
# NOTE: what is volume? what is a sector?