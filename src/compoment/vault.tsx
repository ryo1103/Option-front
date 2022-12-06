import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { borderRadius, padding } from '@mui/system';
import Stack from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Hidden } from '@mui/material';
import { useState } from 'react';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

/**
 * 页面布局左边是一些vault的基本信息，左面透明框 一行一样的样式
 * 右面是存入取出的具体信息 右面用banner颜色打底
 * 存入开始时间 存入结束时间 这一轮使用的资金有多少  池子里总资金有多少 池子的总收益
 * 
 * 
 */

 const TradeButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#3a6df0',
    cursor: 'pointer',
    transition: '0.3s',
    whiteSpace: 'nowrap',
    marginTop: '20px',
    color:'#fff',
    
    
    '&:hover': {
      backgroundColor: '#3a6df0',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  });
 const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'rgb(146 151 179 / 13%)',
    color: '#fff',//'rgb(249 250 251 / 55%)',
    padding: '0 0',
    borderRadius:'14px'
  };

const boxStyle = {
    // 颜色背景透明度增加一点
    backgroundImage: 'linear-gradient(to right top, #cf4af3, #e73bd7, #f631bc, #fd31a2, #ff3a8b, #ff4b78, #ff5e68, #ff705c, #ff8c51, #ffaa49, #ffc848, #ffe652)',
    borderRadius: '14px',
    padding: '0',
    width: '300px',
    overflow: 'hidden',
    // opacity: '0.6'
  };

const styleDivider = {
    color: '#fff'
}

const buttonStyle ={
    width:'50%',
    margin:0,
    color:'#fff',
    opacity: '1',
    fontSize:'14px',
    paddingTop:'10px',
    borderTopRadius: '14px',
}
const buttonWithdrawStyle = {...buttonStyle, 'backgroundColor':'rgb(249 250 251 / 55%)'} //, 
//  boxShadow:'0 0 0 rgba(0, 0, 0, .4),0 0 0 rgba(255, 255, 255, .9),inset -7px -7px 12px rgba(255, 255, 255, .9),inset 7px 7px 12px rgba(0, 0, 0, .4)'}
 
function Vault (){
    const [balance, setBalance] = useState(0)
    const [value, setValue] = useState(0)
    const [isDeposit, setIsDeposit] = useState(true)
    function handleInput(e:any){
        console.log(e)
        setValue(e.target.value)
        console.log(value)

    }
    return (
        <Stack spacing={4} direction="row" justifyContent='center' style={{marginTop:'80px'}}>
            <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem button style={{borderTopLeftRadius:'14px',borderTopRightRadius:'14px' }}>
                <ListItemText primary="Start Time" />
                2022/12/6/06:00
            </ListItem>
            <Divider  />
            <ListItem button divider>
                <ListItemText primary="End Time" />
                2022/12/6/12:00
            </ListItem>
            <ListItem button>
                <ListItemText primary="Value used " />
                $ 0.5M
            </ListItem>
                <Divider light  />
            <ListItem button>
                <ListItemText primary="Total Value" />
                $ 1M
            </ListItem>
            <Divider light  />
            <ListItem button style={{borderBottomLeftRadius:'14px',borderBottomRightRadius:'14px' }}>
                <ListItemText primary="Real-Time P&L" />
                $ 30000
            </ListItem>
            </List>
            <Box sx={boxStyle}>
                <Stack direction="row">
                <Typography variant="overline" display="block" gutterBottom align="center" color='primary' sx={buttonStyle} onClick={()=>setIsDeposit(true)}>
                    deposit
                </Typography>
                <Typography variant="overline" display="block" gutterBottom align="center" color='primary' sx={buttonWithdrawStyle} onClick={()=>setIsDeposit(false)}>
                    withdraw
                </Typography>
                </Stack>
                <Stack direction="column" sx={{padding:'20px' ,backgroundColor: isDeposit ? 'transparent' :'rgb(249 250 251 / 55%)'}}>
                    <Typography variant="caption" display="block" gutterBottom color='primary'>
                        Amount
                    </Typography>
                    <TextField
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        defaultValue = {0}
                        onChange={handleInput}
                        
                    />
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            Wallet Balance
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            {balance} USDT
                        </Typography>
                    </Stack>
                    <TradeButton variant="contained" color='primary' style={{background:isDeposit ? '#3a6df0':'#446fe8db'}}> {isDeposit ? 'Deposit' : 'Withdraw'}</TradeButton>
                </Stack>

                

            </Box>

        </Stack>
    )
} 

export default Vault