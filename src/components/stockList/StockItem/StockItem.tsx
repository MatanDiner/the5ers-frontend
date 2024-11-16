import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { inject, observer } from 'mobx-react';
import { useNavigate } from "react-router-dom";

type Props = {
    symbol: string,
    name: string,
    currency: string,
    stockExchange: string,
    exchangeShortName: string,
    stockStore: any;
    isUserStock: string;
}

const StockItem = inject('stockStore')(
    observer((props: Props) => {
        const navigate = useNavigate();

        const { stockStore, name, isUserStock } = props;

        const onStockClicked = () => {
            const { symbol, name, currency, stockExchange, exchangeShortName } = props;
            stockStore.setSelectedStock({
                symbol,
                name,
                currency,
                stockExchange,
                exchangeShortName,
                isUserStock
            });
            navigate("/stock")
        }

        return <StockItemWrapper onClick={onStockClicked}>
            <Typography className='stockName'>{name}</Typography>
        </StockItemWrapper>
    }),
);

const StockItemWrapper = styled.button`
    height: 52px;
    background-color: blue;
    color: white;
    width: 450px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    cursor: pointer;
    border-radius: 20px;
    border: none;
    :hover{
        border:1px solid white;
    }
    .stockName{
        font-size: 18px;
        font-family: cursive;
        text-align: left;
    }
`

export default StockItem