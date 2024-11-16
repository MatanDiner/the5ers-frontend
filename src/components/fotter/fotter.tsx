import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

type Props = {
    showBackBtn?: boolean
}

const Fotter = ({ showBackBtn = true }: Props) => {
    const navigate = useNavigate();

    const onBackHandler = () => {
        navigate(-1);
    }

    return <FotterStyle>
        {showBackBtn && <Button onClick={onBackHandler}>Back</Button>}
        <Typography className={'fotter'}>The 5Ers Stocks</Typography>
    </FotterStyle>

}

const FotterStyle = styled.div`
     text-align: center;
   .fotter{
     background-color: blue;
     height: 80px;
     display: flex;
     justify-content: center;
     align-items: center;
      font-size: 30px;
      color: red;
      font-family: cursive;
    }
    Button{
    background-color: blue;
    color: white;
    border-radius: 20px;
    margin-bottom: 20px;
    }
    
`

export default Fotter;