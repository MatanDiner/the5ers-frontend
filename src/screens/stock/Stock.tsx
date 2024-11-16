import { Button, Typography } from "@mui/material";
import Layout from "../../components/layout/Layout"
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled'
import { useEffect, useState } from "react";
import { inject, observer } from 'mobx-react';
import axios from "axios";
import { LineChart } from '@mui/x-charts/LineChart';
import { useNavigate } from "react-router-dom";

const Stock = inject('stockStore')(
    observer((props: any) => {
        const navigate = useNavigate();

        const { stockStore = {} } = props;
        const [stockPriceChanges, setStockPriceChanges] = useState({});
        const [stockPrice, setStockPrice] = useState(0);
        const [priceChangeRange, setPriceChangeRange] = useState([0, 0]);
        const [graphColor, setGraphColor] = useState("blue");


        const { selectedStock: { symbol, name, currency, stockExchange, exchangeShortName, isUserStock } } = stockStore;

        useEffect(() => {
            if (symbol) {
                const getPriceChangeData = async () => {
                    const res = await axios.get(`https://financialmodelingprep.com/api/v3/stock-price-change/${symbol}?apikey=4k54ZMK2OD1pIozlDssM9cowd4urE4jQ`)
                    const data = res.data[0];
                    const changes = Object.keys(data).reduce((acc: any, currentKey) => {
                        if (currentKey !== "symbol") {
                            acc[currentKey] = data[currentKey];
                        }
                        return acc;
                    }, {})
                    const dataForPrice = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=4k54ZMK2OD1pIozlDssM9cowd4urE4jQ`)
                    setStockPrice(dataForPrice.data[0]?.price);
                    setStockPriceChanges(changes);
                    onTimeClicked(changes["1D"], 40)
                }
                getPriceChangeData();
            }
        }, [symbol])


        const onTimeClicked = (priceChange: any, stockPrice: number) => {
            const priceBefore = (stockPrice * (priceChange < 0 ? 100 + priceChange : 100 - priceChange)) / 100;
            setPriceChangeRange(priceChange < 0 ? [stockPrice, priceBefore] : [priceBefore, stockPrice]);
            setGraphColor(priceChange < 0 ? 'red' : 'green')
        }

        const onDelete = () => {
            stockStore.removeUserStock(symbol);
            navigate(-1)
        }

        const onAdd = () => {
            stockStore.addUserStock({ symbol, name, currency, stockExchange, exchangeShortName })
            navigate(-1)
        }

        return <Layout>
            <StockWrapper container>
                <Grid size={10}>
                    <Typography className="text">{name}</Typography>
                    <Typography className="text">{symbol}</Typography>
                    <Typography className="text">price:{stockPrice}$</Typography>
                    {Object.entries(stockPriceChanges).map(([time, priceChange]) => {
                        return <Button onClick={() => onTimeClicked(priceChange, stockPrice)}>{time}</Button>
                    })}
                    <LineChart
                        series={[
                            {
                                data: priceChangeRange,
                                area: true,
                                baseline: 'min',
                            },
                        ]}
                        colors={[graphColor]}
                        width={700}
                        height={300}
                    />
                </Grid>
                <Grid size={2} display={"flex"} alignItems={"center"}>
                    {isUserStock && <Button onClick={onDelete}>Delete</Button>}
                    {!isUserStock && <Button onClick={onAdd}>Add</Button>}
                </Grid>
            </StockWrapper>
        </Layout>
    }),
);


const StockWrapper = styled(Grid)`
  .title1{
    font-size: 30px;
    color: blue;
    font-family: cursive;
  }
  Button{
    background-color: blue;
    color: white;
    border-radius: 20px;
  }
  .text{
    color: blue;
    font-family: cursive;
    font-size: 20px;
    text-align: center;
    margin-bottom: 15px;
  }
`

export default Stock;