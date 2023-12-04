import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
// break into component
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// NOTE: these are in snake case because that is what comes back from the python BE at this time
interface SectorLevel {
  one: string;
  two: string;
}

interface StockPrices {
  date: string;
  volume: number;
  close_usd: number;
}
interface Stock {
  stock_prices: StockPrices[]
  sector_level: SectorLevel
}


function App() {
  const [stocks, setStocks] = useState<{[index: string]: Stock} | {}>({})
  const [stockYear, setStockYear] = useState<string>("2015")
  // should go in component, creates a list of years from now to 1999, when our stock data starts
  const availableYears = Array.from({length: (new Date().getFullYear() - 1998)}, (_, i) => (new Date().getFullYear() - i).toString())

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks`)
    .then(response => {
      // on response, set the stocks with their name as the key and a list of each stock price object associated
      for (const [key, value] of Object.entries<Stock>(response.data)) {
        // NOTE: in later iterations make a more scalable solution
        // control for massive dataset with a selected year state; we assume format is YYYY-MM-DD in this app
        value.stock_prices = value.stock_prices.filter(entry => entry.date.split("-")[0] === stockYear)
        console.log(value)
        setStocks(prevStocks => ({
          ...prevStocks,
          [key]: value
        }))
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, [stockYear]);

  const handleChange = (event: SelectChangeEvent) => {
    setStockYear(event.target.value);
  };


  return (
    <div className="App" style={{margin:'1%'}}>
      <header className="App-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2%'}}>
        <h1>OWL Stock Prices</h1>
        <FormControl style={{marginRight: '35%', width: '10%'}}>
        <InputLabel id="selectedYear">Year</InputLabel>
        <Select
          labelId="selectedYear"
          id="stockYear-select"
          value={stockYear}
          label="Year"
          onChange={handleChange}
        >
          {availableYears.map(year => <MenuItem value={year}>{year}</MenuItem>)}
        </Select>
      </FormControl>
      </header>
      <div className='App-container'>
        {/* this page is the home page */}
        {stocks && Object.entries(stocks).map(stock => {
          const [stockName, stockDetails] = stock
          return (
            <>
            {stockDetails.stock_prices.length ?
            <>
            <div>{stockName}</div>
             <LineChart
              width={1000}
              height={500}
              xAxis={[{data: stockDetails.stock_prices.map(stock => stock.date), scaleType: 'band'}]}
              series={[{data: stockDetails.stock_prices.map(stock => stock.close_usd), label: 'USD'}]}
            />
            </>
            :
            <div></div>
          }
            </>
          )
        })
        }
      </div>
    </div>
  );
}

export default App;
