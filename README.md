# Old Well Labs - Stock Price 
This web application is designed to provide users with insights into fixed stock price data. It consists of both a backend and a frontend component, allowing users to explore and analyze stock prices over time.

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
  
- **Httpx:** ^0.21.2
  - A fully featured HTTP client for Python 3, which provides sync and async APIs, and support for both HTTP/1.1 and HTTP/2. Required to use the TestClient from FastAPI.

### Frontend
- **React:** ^18.2.0
  - A JavaScript library for building user interfaces.

- **TypeScript:** ^4.9.5
  - A typed superset of JavaScript that compiles to plain JavaScript.

- **React Router DOM:** ^6.20.1
  - Declarative routing for React.js.

- **Axios:** ^1.6.2
  - Promise-based HTTP client for the browser and Node.js.

- **Day.js:** ^1.11.10
  - A minimalist JavaScript library for parsing, validating, manipulating, and displaying dates.

- **Jest:** ^27.5.2
  - A delightful JavaScript testing framework.

- **Material-UI (MUI):** ^5.14.19
  - React components for faster and easier web development.

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

Now that your backend is up and the api is listening it's time to fire up the UI!

1. Navigate to the frontend directory. `ui/web/`
2. Install the required dependencies. 
  ```bash
  npm install
  ```
3. Start the frontend application.
  ```bash
  npm start
  ```
4. Head to `localhost:3000/`. From here you can change the year on the top right and click on the name to select a single asset.
Each asset's page has a return calculator and it's own table shown. Clicking on `OWL Stock Prices` will bring you back to the home page.