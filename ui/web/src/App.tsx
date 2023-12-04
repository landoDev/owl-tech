import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';


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

interface StockData {
  xAxis: string[];
  series: number[];
}



function App() {
  const [stockData, setStocksData] = useState<{[index: string]: StockData} | {}>({})

  useEffect(()=> {
    axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks`)
    .then(response => {
      // on response, set the stocks with their name as the key and a list of each stock price object associated
      for (const [key, stockDetails] of Object.entries<Stock>(response.data)) {
        // NOTE: in later iterations make a more scalable solution
        setStocksData(prevStocks => ({
          ...prevStocks,
          [key]: {
            "xAxis": stockDetails.stock_prices.map(stock => stock.date), scaleType: 'band',
            "series": stockDetails.stock_prices.map(stock => stock.close_usd)
          }
        }))
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

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
        {/* <LineChart */}
        {/* TODO: make me a component to keep App clean */}
        {stockData && Object.entries(stockData).map(stock => {
          const [stockName, stockDetails] = stock
          console.log(stockDetails)
          // console.log('StockName', stockName, 'stockDetails',{} stockDetails.stock_prices.map(x => x.close_usd))
          // console.log()
          // this nested looping is not going to cut it
          return (
            <>
            <div key={stockName}>{stockName}</div>
            <LineChart
              width={500}
              height={300}
              xAxis={[{data: stockDetails.xAxis, scaleType: 'band'}]}
              series={[{data: stockDetails.series}]}
            />
            </>
          )
        })
        }
      </div>
    </div>
  );
}

export default App;
