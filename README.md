# Old Well Labs - Stock Price 

* Backend Requirements:
    - Create data models in Python that would represent the structure of the data if it were to be stored in a PostgreSQL database.
    - Develop a RESTful API that reads the stock price data directly from the provided CSV file and uses the data models to structure the API responses.
    - Implement endpoints for listing all stock data, retrieving data for a specific asset and calculating cumulative returns between two dates.

* Frontend Requirements:
    - Develop a frontend application that displays the stock price data served by the backend. Just the price series overtime is fine.
    - The frontend should allow users to view the list of all assets and their prices and select individual assets to view more details.

## Project Dependencies
> Both Frontend and Backend dependenices are listed here
### Backend
- **Python:** ^3.10
  - The programming language used for development.

- **FastAPI:** ^0.104.1
  - A modern, fast (high-performance), web framework for building APIs with Python.

- **Uvicorn:** ^0.24.0.post1
  - ASGI server for running FastAPI applications. (with extras "standard")

- **Pandas:** ^2.1.3
  - A powerful data manipulation library for Python, used for working with structured data.

## Getting Started

First things first, let's stand up the backend. From the project root, go into the `api` directory:

```bash
cd api
```

1. Install poetry if not already installed:
    > [Poetry Docs](https://python-poetry.org/docs/) for more on installation.

    ```bash
    curl -sSL https://install.python-poetry.org | python -
    ```

2. In `owl-tech/api`, install the required dependencies using Poetry:
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
5. Open `http://127.0.0.1:8000` in your browser to confirm the api is up!

6. Access the FastAPI interactive documentation at `http://localhost:8000/docs` to explore the available endpoints and interact with the live test scores.
