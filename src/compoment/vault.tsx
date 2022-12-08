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
import { useState, useEffect, useRef} from 'react';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { getLiquidityPoolContract, compare} from '../utils'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useRequest } from 'ahooks';
import { useTokenContract } from '../hooks/useContract';
import { usdt } from '../config';
import { formatEther, parseEther } from "@ethersproject/units";
import { liquidityPool as PoolAddress, maxAllowance } from '../config';

/**
 * 页面布局左边是一些vault的基本信息，左面透明框 一行一样的样式
 * 右面是存入取出的具体信息 右面用banner颜色打底
 * 存入开始时间 存入结束时间 这一轮使用的资金有多少  池子里总资金有多少 池子的总收益
 * 
 * 钱包断开还没有处理
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
    borderTopLeftRadius: '14px',
   // borderBottomRightRadius: '14px',
}
const buttonWithdrawStyle = {...buttonStyle, 'backgroundColor':'rgb(249 250 251 / 55%)'} //, 
//  boxShadow:'0 0 0 rgba(0, 0, 0, .4),0 0 0 rgba(255, 255, 255, .9),inset -7px -7px 12px rgba(255, 255, 255, .9),inset 7px 7px 12px rgba(0, 0, 0, .4)'}
 
function Vault (){
    const [balance, setBalance] = useState(0)
    const [withdraw, setWithdraw] = useState(0)
    const [userHaveDeposit, setUserHaveDeposit] = useState(0)
    const [value, setValue] = useState(0)
    const ref = useRef()
    const [isDeposit, setIsDeposit] = useState(true)
    const context = useWeb3React()
    const { chainId, account,library, error: loginError } = context
    console.log(chainId, account)
    // @ts-ignore
    const liquidityPool = getLiquidityPoolContract(library, account)
    const tokenContract = useTokenContract(usdt)
    console.log('liquiditypool', liquidityPool, usdt,  tokenContract)
    function handleInput(e:any){
        console.log(e)
        setValue(e.target.value)
        console.log(value)

    }

    const { run: getBalance, data: getBalanceRes, error: getUserStakeError } = useRequest(() => tokenContract?.balanceOf(account), {
        manual: true,
        refreshDeps: [account],
        pollingInterval: 5000,
        pollingWhenHidden: false
      })

    const { run: getWithdraw, data: getWithdrawRes, error: getwidthdrawError } = useRequest(() => liquidityPool?.getWithdrawValue(), {
        manual: true,
        refreshDeps: [account],
        pollingInterval: 5000,
        pollingWhenHidden: false
      })
    
    const { run: getDepositValue, data: getDepositValueRes, error: getDepositValueError } = useRequest(() => liquidityPool?.getDepositValue(), {
        manual: true,
        refreshDeps: [account],
        pollingInterval: 5000,
        pollingWhenHidden: false
      }) 

    const { run: deposit, data: depositRes, error: getDepositError } = useRequest(() => liquidityPool?.deposit(parseEther(value.toString())), {
        manual: true,
        refreshDeps: [account],
        // pollingInterval: 5000,
        pollingWhenHidden: false
      })

    const { run: userWithdraw, data: withdrawRes, error: getWithdrawError } = useRequest(() => liquidityPool?.withdraw(parseEther(value.toString())), {
        manual: true,
        refreshDeps: [account],
        // pollingInterval: 5000,
        pollingWhenHidden: false
      })


    const { runAsync: getAllowance, data: allowanceData, error: allowanceError, loading: allowanceLoading }
    = useRequest(() => tokenContract?.allowance(account, PoolAddress), { manual: true })

    // console.log('approve 信息', marketAddress, maxAllowance)
    const { runAsync: tokenapprove, data: approveData, error: approveEror, loading: approveLoading }
    = useRequest(() => tokenContract?.approve(PoolAddress, maxAllowance), { manual: true })
    
    const handleDpositClick = async() => {
        try{
        const res:any = await getAllowance()
        const allowBalanceStr =  res?.toString()
       // getAllowance().then((res: any) => {
        // console.log('获取已经授权的额度allowBalance：', res.toString())
      //  const allowBalanceStr = res?.toString()
        if (!compare(parseEther(value.toString()).toString(), allowBalanceStr, "gt")) {
            console.log(value, allowBalanceStr)
            console.log('compare(quotePrice.value, allowBalanceStr, "gt")', compare(value, allowBalanceStr, "gt"))
            deposit()
        }else{
            await tokenapprove()
            deposit()
        }
        }catch(e){
            console.log("----allowanceError", e)
        }
    }



    useEffect(() => {
        // approveHCT()
        if (account){
            getBalance()
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [account]) 

    useEffect(() => {
        if (getBalanceRes) {
            // @ts-ignore
            console.log('token 数目', getBalanceRes, formatEther(getBalanceRes))
            // @ts-ignore
            setBalance(formatEther(getBalanceRes))
            //  setBalance(getBalanceRes)
        }
        }, [getBalanceRes])

    useEffect(() => {
            // approveHCT()
        if (account){
            getWithdraw()
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [account]) 
    
        useEffect(() => {
            if (getWithdrawRes) {
                // @ts-ignore
                console.log('可提取数目', getWithdrawRes, formatEther(getWithdrawRes))
                // @ts-ignore
                setWithdraw(formatEther(getWithdrawRes))
                //  setBalance(getBalanceRes)
            }
            }, [getWithdrawRes])
    

        useEffect(() => {
                // approveHCT()
            if (account){
                getDepositValue()
            } 
            // eslint-disable-next-line react-hooks/exhaustive-deps
            }, [account]) 
        
        useEffect(() => {
            if (getDepositValueRes) {
                    // @ts-ignore
                console.log('已存入token', getDepositValueRes, formatEther(getDepositValueRes))
                    // @ts-ignore
                    setUserHaveDeposit(formatEther(getWithdrawRes))
                    //  setBalance(getBalanceRes)
                }
            }, [getDepositValueRes]) 




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
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        helperText=" "
                        id="demo-helper-text-aligned-no-helper"
                        defaultValue = {0}
                        onChange={handleInput}
                        // inputRef 之后再写
                        
                    />
                    {
                       isDeposit ? (
                        <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            Wallet Balance
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            {balance} USDT
                        </Typography>
                        </Stack>

                        )
                        :(<Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" display="block" gutterBottom color='primary'>
                                Withdrawable amount
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom color='primary'>
                                {withdraw} USDT
                            </Typography>
                        </Stack>
                        )
                    }
                    <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            Deposited Value
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                            {userHaveDeposit} USDT
                        </Typography>
                    </Stack>
                 
                    {
                    account ? <TradeButton variant="contained" color='primary' style={{background:isDeposit ? '#3a6df0':'#446fe8db'}} onClick={isDeposit? handleDpositClick : userWithdraw}> {isDeposit ? 'Deposit' : 'Withdraw'}</TradeButton>
                    : <TradeButton variant="contained" color='primary' style={{background:isDeposit ? '#3a6df0':'#446fe8db'}}> Connect Wallet</TradeButton>
                    }
                </Stack>

                

            </Box>

        </Stack>
    )
} 

export default Vault