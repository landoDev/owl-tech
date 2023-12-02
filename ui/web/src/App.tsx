import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

function App() {
  const [stocks, setStocks] = useState([])

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks`)
    .then(response => {
      setStocks(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }, []);
  console.log(stocks)
  return (
    <div className="App">
      <header className="App-header">
        <h1>OWL Stock Prices</h1>
      </header>
      <div className='App-container'>
        {/* this page is the home page */}
        {/* call the all stocks endpoint on render and construct a line chart next to each asset's name  */}
        {/* The asset name should be big and clickable */}
        {/* an SPA page opens up with their Line chart, and the total cumulative returns and a table of the daily returns for their lifespan */}
        {/* above this table is a date filter that the user can use to filter the date range and see the total cumulative returns and daily returns for that period */}
        
      </div>
    </div>
  );
}

export default App;
