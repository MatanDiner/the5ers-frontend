import styled from '@emotion/styled'
import { Typography } from '@mui/material';

const Header = () => {
    return <HeaderStyle>
        <Typography variant='h1' className={'title'}>The 5Ers Stocks</Typography>
    </HeaderStyle>

}

const HeaderStyle = styled.div`
    background-color: blue;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  .title{
    font-size: 30px;
    color: red;
    font-family: cursive;
  }
`

export default Header;