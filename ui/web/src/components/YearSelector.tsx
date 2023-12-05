import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import useAvailableYears from '../hooks/useAvailableYears';

// interface YearSelectorProps {
//     setYear:
// }

const YearSelector = ({stockYear, setStockYear}: any) => {
    // const [stockYear, setStockYear] = useState<string>("2023");
    // should go in component, creates a list of years from now to 1999, when our stock data starts
    const availableYears = useAvailableYears()
    const handleChange = (event: SelectChangeEvent) => {
      setStockYear(event.target.value);
    };
  
    return(
        <>
        <FormControl style={{marginLeft: '60%', width: '10%'}}>
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
        </>
    )
}

export default YearSelector;