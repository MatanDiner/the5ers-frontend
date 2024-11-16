import { Typography } from "@mui/material";
import Layout from "../../components/layout/Layout"
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled'
import { useEffect } from "react";
import { inject, observer } from 'mobx-react';
import StockList from "../../components/stockList/stockList";
import Search from "../../components/search/Search";

const Home = inject('stockStore')(
    observer((props: any) => {
        const { stockStore } = props;

        useEffect(() => {
            stockStore.getUserStocks()
        }, [])

        return (
            <Layout showBackBtn={false}>
                <HomeWrapper container >
                    <Grid size={12} textAlign={"center"}>
                        <Typography variant="h2" className={"title1"}>Hey Matan, your stock portfolio</Typography>
                    </Grid>
                    <Grid size={6}>
                        <Search />
                    </Grid>
                    <Grid size={6} >
                        <StockList />
                    </Grid>
                </HomeWrapper>
            </Layout>
        )
    }),
);

const HomeWrapper = styled(Grid)`
  .title1{
    font-size: 30px;
    color: blue;
    font-family: cursive;
    margin: 20px 0;
  }
`

export default Home;