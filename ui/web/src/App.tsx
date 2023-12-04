import React,  { useState, useEffect } from 'react';
import axios from 'axios';
// NOTE: would start breaking the selector into it's own component
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { LineChart } from '@mui/x-charts/LineChart';
import LinearProgress from '@mui/material/LinearProgress';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link } from 'react-router-dom';

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
  const [stocks, setStocks] = useState<{[index: string]: Stock} | {}>({});
  const [stockYear, setStockYear] = useState<string>("2023");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // should go in component, creates a list of years from now to 1999, when our stock data starts
  const availableYears = Array.from({length: (new Date().getFullYear() - 1998)}, (_, i) => (new Date().getFullYear() - i).toString())

  useEffect(()=> {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks`)
    .then(response => {
      // on response, set the stocks with their name as the key and a list of each stock price object associated
      for (const [key, value] of Object.entries<Stock>(response.data)) {
        // NOTE: in later iterations make a more scalable solution
        // control for massive dataset with a selected year state; we assume format is YYYY-MM-DD in this app
        value.stock_prices = value.stock_prices.filter(entry => entry.date.split("-")[0] === stockYear);
        setStocks(prevStocks => ({
          ...prevStocks,
          [key]: value
        }));
      }
      setIsLoading(false)
    })
    .catch(error => {
      console.error(error);
      setIsLoading(false)
    });
  }, [stockYear]);

  const handleChange = (event: SelectChangeEvent) => {
    setStockYear(event.target.value);
  };


  return (
    <div className="App" style={{margin:'1%'}}>
      {/* this page is the home page */}
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
        {isLoading && 
          <div style={{marginBottom: '2%', marginTop: '2%'}}>
            <p>Updating data...</p>
            <LinearProgress />
          </div>
        }
        {stocks && Object.entries(stocks).map(stock => {
          const [stockName, stockDetails] = stock
          return (
            <div>
            {/* only show assests that were active/has data in the selected year */}
            {!!stockDetails.stock_prices.length &&
            <>
            <Link to={`${stockName}`}>{stockName}</Link>
             <LineChart
              width={1000}
              height={500}
              xAxis={[{data: stockDetails.stock_prices.map(stock => stock.date), scaleType: 'band'}]}
              series={[{data: stockDetails.stock_prices.map(stock => stock.close_usd), label: 'USD'}]}
            />
            </>
          }
            </div>
          )
        })
        }
      </div>
    </div>
  );
}

export default App;
