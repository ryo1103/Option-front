

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import soldout1 from '../assets/images/soldout.png'
import { Link } from 'react-router-dom'
import EthIcon from '../assets/images/eth.svg';
import BtcIcon from '../assets/images/btc.svg';

const StyledCard = styled(Card)({
  backgroundColor: 'rgb(146 151 179 / 13%)',
  borderRadius: '14px',
  width:'240px',
  marginTop: '10px'

});

function CardItem({option, isExpire, isSoldOut, name, base, strike }:any){

    return (
    <Link to={`/option/${name}`} style={{textDecoration:'none'}}>
    <StyledCard sx={{ maxWidth: 345 }} style={{marginLeft:'5px', backgroundColor: 'rgb(146 151 179 / 13%)'}}>
      <CardActionArea style={{backgroundColor: 'rgb(146 151 179 / 13%)'}}>
        {isSoldOut ?
              <CardMedia
                component="img"
                height="140"
                image={soldout1}
                alt="green iguana"
                style={{backgroundColor: 'rgb(146 151 179 / 13%)'}}
              />
              :
              <CardMedia
                component="img"
                height="140"
                image={(base ==='eth' ? EthIcon: BtcIcon)}
                alt="green iguana"
                style={{backgroundColor: 'rgb(146 151 179 / 13%)'}}
              />
        }

        <CardContent style={{backgroundColor: 'rgb(146 151 179 / 13%)'}}>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {name}
          </Typography>
          <Typography variant="body2" color="primary">
         { `Trading ${name} option token for ${strike} strike price in ${base} .`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/option/${name}`} style={{textDecoration:'none'}}>
          <Button size="small" color="secondary" >
            {isExpire || isSoldOut ?  'Details' : 'Trade'}
          </Button>
        </Link>
      </CardActions>
    </StyledCard>
    </Link>
    )


}

export default CardItem