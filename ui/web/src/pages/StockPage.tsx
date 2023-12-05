import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';


import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LineChart } from "@mui/x-charts/LineChart";

import YearSelector from "../components/YearSelector";
import { Stock, StockPrice } from './HomePage';
import { Button } from '@mui/material';

const StockPage = () => { 
    const {state: {stockName, selectedYear}} = useLocation();
    const [stockDetails, setStockDetails] = useState<Stock | null>(null);
    const [stockYear, setStockYear] = useState<string>(selectedYear);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fromDateValue, setFromDateValue] = useState<Dayjs | null>(dayjs(`${selectedYear}-01-01`));
    const [toDateValue, setToDatevalue] = useState<Dayjs | null>(dayjs(`${selectedYear}-12-31`));
    const [cumulativeReturnValue, setCumulativeReturnValue] = useState<number | null>(null);


    useEffect(()=> {
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks/${stockName}`)
        .then(response => {
            const { data: { stock_prices, sector_level} } = response
            const filteredPrices = stock_prices.filter((entry: StockPrice )=> entry.date.split("-")[0] === stockYear);
            filteredPrices.length ?
            setStockDetails({
                "stock_prices": filteredPrices,
                "sector_level": sector_level
            })
            :
            setStockDetails(null)
          setIsLoading(false)
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false)
        });
      }, [stockYear]);

    const handleReturnsSubmit = () => {
        const from = fromDateValue?.format('YYYY-MM-DD');
        const to = toDateValue?.format('YYYY-MM-DD');
        axios.get(
        `${process.env.REACT_APP_STOCKS_API_URL, 'http://127.0.0.1:8000'}/stocks/return/${stockName}?date_start=${from}&date_end=${to}`
        ).then(response => {
            const { data: { entire_period } } = response;
            setCumulativeReturnValue(entire_period);
        })
        .catch(error => {
          console.error(error);
        });
    }

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
            {stockDetails ? // if we have data for the year show it, otherwise tell user
            <>
            <LineChart 
                height={500} 
                width={1000} 
                xAxis={[{data: stockDetails?.stock_prices.map(stock => stock.date), scaleType: 'band' as 'band'}]} 
                series={[{data: stockDetails?.stock_prices.map(stock => stock.close_usd), label: 'USD', color: 'green'}]} 
            />
     
            <div style={{display: 'flex', justifyContent: 'space-around', width: '75%' ,alignItems: 'center'}}>
                <div>
                    {cumulativeReturnValue &&
                        <div>Calculated Return: {cumulativeReturnValue}%</div>
                    }
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <>
                        <p>Calculate Cumulative Returns</p>
                    </>
                    <div>
                    <DatePicker 
                        label="From"
                        format='YYYY-MM-DD' 
                        value={fromDateValue} 
                        defaultValue={fromDateValue}
                        onChange={(newValue) => setFromDateValue(newValue)}
                    />
                    <DatePicker 
                        label="To"
                        format='YYYY-MM-DD' 
                        value={toDateValue} 
                        defaultValue={toDateValue} 
                        onChange={(newValue) => setToDatevalue(newValue)}
                    />
                    </div>
                    <Button 
                        style={{alignSelf: 'end', marginTop: '2%'}}
                        variant="contained"
                        color="success"
                        onClick={handleReturnsSubmit}
                    >
                        Calculate
                    </Button>
                </div>

            </div>
            </>
            :
            <div>No Data for {stockYear}</div>
            }
        </div>
    )
}

export default StockPage;