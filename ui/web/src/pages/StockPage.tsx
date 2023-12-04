import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';
import { LineChart } from "@mui/x-charts/LineChart";

import YearSelector from "../components/YearSelector";
import { Stock, StockPrice } from './HomePage';

// TODO: make interface for me
const StockPage = () => { 
    const {state: {stockName, selectedYear}} = useLocation()
    const [stockDetails, setStockDetails] = useState<Stock>();
    const [stockYear, setStockYear] = useState<string>(selectedYear);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=> {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks/${stockName}`)
        .then(response => {
            const { data: { stock_prices, sector_level} } = response
            const filteredPrices = stock_prices.filter((entry: StockPrice )=> entry.date.split("-")[0] === stockYear);
            setStockDetails({
                "stock_prices": filteredPrices,
                "sector_level": sector_level
            })
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false)
        });
      }, [stockYear]);

    return (
        <div>
            <h2>{stockName}</h2>
            <div>{stockDetails && `${stockDetails?.sector_level?.one}: ${stockDetails?.sector_level?.two}`}</div>
            <YearSelector stockYear={stockYear} setStockYear={setStockYear} />
            {isLoading && 
                <div style={{marginBottom: '2%', marginTop: '2%', marginLeft: '30%', paddingTop: '10%', width: '50%'}}>
                    <CircularProgress />
                </div>
            }
            {stockDetails &&
            <>
            <LineChart 
                height={500} 
                width={1000} 
                xAxis={[{data: stockDetails?.stock_prices.map(stock => stock.date), scaleType: 'band' as 'band'}]} 
                series={[{data: stockDetails?.stock_prices.map(stock => stock.close_usd), label: 'USD', color: 'green'}]} 
            />
            </>
            }
            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '70%'}}>
                <div>Put calculated total return here</div>
                <div>put from-to calculator form here default is entire availableYears</div>
            </div>
        </div>
    )
}

export default StockPage;