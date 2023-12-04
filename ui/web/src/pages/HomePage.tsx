import { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import YearSelector from '../components/YearSelector';

// NOTE: these are in snake case because that is what comes back from the python BE at this time
interface SectorLevel {
  one: string;
  two: string;
}

export interface StockPrice {
  date: string;
  volume: number;
  close_usd: number;
}
export interface Stock {
  stock_prices: StockPrice[]
  sector_level: SectorLevel
}

// With less of a time constraint, I'd consider redux


const HomePage = () => {
    const [stocks, setStocks] = useState<{[index: string]: Stock} | {}>({});
    const [stockYear, setStockYear] = useState<string>("2023");
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
  

    return (
        <div className='App-container'>
            {/* the year selector was moved to a reusable component and out of the site nav */}
            {/* reasoning being was to manage scope, this would have my eye for refactor */}
            {/* I would have needed a context manager to handle passing year down from the top level */}
            <YearSelector stockYear={stockYear} setStockYear={setStockYear} />
        {isLoading && 
          <div style={{marginBottom: '2%', marginTop: '2%'}}>
            <p>Updating data...</p>
            <LinearProgress />
          </div>
        }
        {stocks && Object.entries(stocks).map(stock => {
          const [stockName, stockDetails] = stock;
          const width = 1000;
          const height = 500;
          const xAxis = [{data: stockDetails.stock_prices.map(stock => stock.date), scaleType: 'band' as 'band'}];
          const series = [{data: stockDetails.stock_prices.map(stock => stock.close_usd), label: 'USD', color: 'green'}];
        
          return (
            <div>
            {/* only show assests that were active/has data in the selected year */}
            {!!stockDetails.stock_prices.length &&
            <>
            <Link 
            to={`${stockName}`} 
            style={{fontSize: '20px', color: 'inherit'}}
            // TODO: type me
            state={{
              stockName: stockName,
              selectedYear: stockYear, 
              height: height,
              width: width,
              xAxis: xAxis,
              series: series,
              chartData: stockDetails.stock_prices,
              sectorLevel: stockDetails.sector_level
            }}
            >
              {stockName}
            </Link>
             <LineChart
              width={width}
              height={height}
              xAxis={xAxis}
              series={series}
            />
            </>
          }
            </div>
          )
        })
        }
      </div>
    )
}

export default HomePage;