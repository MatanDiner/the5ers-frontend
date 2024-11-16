import { inject, observer } from 'mobx-react';
import StockItem from "../stockList/StockItem/StockItem"
import styled from '@emotion/styled'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useMemo, useState } from 'react';

const StockList = inject('stockStore')(
    observer((props: any) => {
        const { stockStore } = props;
        const [listValue, setListValue] = useState("0")
        const isUserStocks = listValue === "0";

        const buildList = useMemo((): any => {
            let stocks = isUserStocks ? stockStore.userStocks : stockStore.stocks;
            if (stockStore.searchText) {
                stocks = stocks?.filter((st: any) => {
                    const name = st.name.toLowerCase()
                    return name.includes(stockStore.searchText.toLowerCase())
                })
            }
            return stocks.map((stock: any) => <StockItem isUserStock={listValue === "0"} {...stock} />)
        }, [stockStore.searchText, listValue, stockStore.userStocks, stockStore.stocks])



        const handleChange = (e: any) => {
            const value = e.target.value;
            setListValue(value);
            if (value === "0") {
                stockStore.getUserStocks();
            } else {
                stockStore.getAllStocks()
            }
            stockStore.setSearchText("");
        }

        return <StockListWrapper>
            <RadioGroup
                value={listValue}
                onChange={handleChange}
            >
                <FormControlLabel value="0" control={<Radio />} label="your stocks" />
                <FormControlLabel value="1" control={<Radio />} label="all stocks" />
            </RadioGroup>
            {buildList}
        </StockListWrapper>
    }),
);

const StockListWrapper = styled.div`
    height: 400px;
    overflow-y: auto;
    margin-bottom: 50px;    overflow-y: auto;
    max-width: 500px;
    padding: 20px;
    background-color: darkblue;

    span.MuiFormControlLabel-label{
        color: red;
        font-family: cursive;
        font-size: 16px;
    }

    span.css-13lvt8g-MuiButtonBase-root-MuiRadio-root.Mui-checked {
        color: red;
    }

    ::-webkit-scrollbar {
      display: block;
      width: 5px;
    }
    ::-webkit-scrollbar-track {
      background-color: blue;
    }

    ::-webkit-scrollbar-thumb {
        background-color: red;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track-piece:end {
        background-color: transparent;
        margin-bottom: 10px;
    }

    ::-webkit-scrollbar-track-piece:start {
        background-color: transparent;
        margin-top: 10px,
    }
`

export default StockList