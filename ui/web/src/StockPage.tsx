import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// TODO: make interface for me
const StockPage = () => { 
    const {state: {selectedYear, xAxis, series}} = useLocation()
    useEffect(()=> {
        console.log(selectedYear, xAxis, series)
    })
    return (
        <div>
            <h2>BUILDING</h2>
        </div>
    )
}

export default StockPage;