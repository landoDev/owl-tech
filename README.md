# Old Well Labs - Stock Price 

* Backend Requirements:
    - Create data models in Python that would represent the structure of the data if it were to be stored in a PostgreSQL database.
    - Develop a RESTful API that reads the stock price data directly from the provided CSV file and uses the data models to structure the API responses.
    - Implement endpoints for listing all stock data, retrieving data for a specific asset and calculating cumulative returns between two dates.

* Frontend Requirements:
    - Develop a frontend application that displays the stock price data served by the backend. Just the price series overtime is fine.
    - The frontend should allow users to view the list of all assets and their prices and select individual assets to view more details.

## Project Dependencies
TODO: decide whether to break these out into each FE and BE dir README (what i would do for a monorepo like this normally)

## Getting Started

First things first, let's stand up the backend:

```bash
cd api
```

1. Install poetry if not already installed:
    > [Poetry Docs](https://python-poetry.org/docs/) for more on installation.

    ```bash
    curl -sSL https://install.python-poetry.org | python -
    ```

2. In `owl-tech/api`, install the required dependencies using Poetry (**Note**: From the root of the project where `pyproject.toml` is):
    ```bash
    poetry install
    ```

3. Activate the virtual environment:
    ```bash
    poetry shell
    ```

4. Run the app using Uvicorn:
    ```bash
    uvicorn main:app --reload
    ```

