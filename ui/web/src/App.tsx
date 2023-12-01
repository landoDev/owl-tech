import React from 'react';
import logo from './logo.svg';
import './App.css';
import { LineChart } from '@mui/x-charts/LineChart';

function App() {
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
        <p>Under Construction</p>
      </div>
    </div>
  );
}

export default App;
