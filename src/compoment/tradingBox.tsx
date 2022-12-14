import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment';
import { useTokenContract } from '../hooks/useContract';
import { usdt , maxAllowance, traderList} from '../config';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useRequest } from 'ahooks';
import { getOptionTraderContract, compare} from '../utils';
import { formatEther, parseEther } from "@ethersproject/units";

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function TradingBox({position, price, limit, isPut, optionName, time}:any) {
  
  const [value, setValue] = React.useState(0)
  const [totalCost, setTotalCost] = React.useState(0)
  const [buyAmount, setBuyAmount] = React.useState(0)
  const [sellAmount, setSellAmount] = React.useState(0)
  // @ts-ignore
  const traderAddress = traderList[optionName]

  const context = useWeb3React()
  const { chainId, account,library, error: loginError } = context
  const tokenContract = useTokenContract(usdt)
  //@ts-ignore
  const traderContract = getOptionTraderContract(library,account,optionName)
    // @ts-ignore
  console.log('traderAddress',traderList[optionName], optionName,traderList['btcCall'])
  
  const { runAsync: getAllowance, data: allowanceData, error: allowanceError, loading: allowanceLoading }
    = useRequest(() => tokenContract?.allowance(account, traderAddress), { manual: true })

  // console.log('approve ??????', marketAddress, maxAllowance)
  const { runAsync: tokenapprove, data: approveData, error: approveEror, loading: approveLoading }
    = useRequest(() => tokenContract?.approve(traderAddress, maxAllowance), { manual: true })

    // ??????????????????????????? ?????????3???
  const { runAsync: buy, data: buyData, error: buyError, loading: buyLoading }
    = useRequest(() => traderContract?.buyToken(Number(buyAmount),parseEther(price).div(10**3), Number(time)), { manual: true })

  const { runAsync: sell, data: sellData, error: sellError, loading: sellLoading }
    = useRequest(() => traderContract?.sellToken(Number(sellAmount),parseEther(price)), { manual: true })

  const handleBuyClick = async() => {
      try{
      const res:any = await getAllowance()
      const allowBalanceStr =  res?.toString()
     // getAllowance().then((res: any) => {
      // console.log('???????????????????????????allowBalance???', res.toString())
    //  const allowBalanceStr = res?.toString()
      if (!compare(parseEther(totalCost.toString()).toString(), allowBalanceStr, "gt")) {
          console.log(parseEther(totalCost.toString()).toString(), allowBalanceStr)
          console.log(formatEther(parseEther(price)), buyAmount, time)
          console.log('compare(value, allowBalanceStr, "gt")', compare(parseEther(totalCost.toString()).toString(), allowBalanceStr, "gt"))
          let buyRes = await buy()
          console.log(buyRes, '????????????')
      }else{
          await tokenapprove()
          let buyRes = await buy()
          console.log(buyRes, '????????????')
      }
      }catch(e){
          console.log("----allowanceError", e)
      }
  }

  const handleSellClick = async() => {
    try{
      let res:any = await sell()
      console.log('????????????', res)
    }catch(e){
        console.log("----allowanceError", e)
    }
}
  

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }


  function handleBuyInput(e:any){
    console.log(e)
    setBuyAmount(e.target.value)
    setTotalCost(e.target.value * price)
    console.log('buy',e.target.valu, e.target.valu * price)

  }
  function handleSellInput(e:any){
    console.log(e)
    setSellAmount(e.target.value)
    setTotalCost(e.target.value * price)
    console.log('sell', e.target.value)

  }


  console.log('??????', value)
  

  return (
    <Box sx={{ width: '100%'}}>

      <Box sx={{ width: '100%'}}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="BUY" {...a11yProps('buy')} sx={{width:'50%'}}/>
          <Tab label="SELL" {...a11yProps('sell')}  sx={{width:'50%'}}/>
        </Tabs>
      </Box>
      <Stack direction='column' padding='14px'>
      <Typography variant="overline" gutterBottom color="primary">
          Option Price: {price === undefined ? '--': price}
      </Typography>
      <TabPanel value={value} index={0} >
        <Stack justifyContent="space-around"  margin=' -18px -14px'>
          <Typography variant="overline" gutterBottom color="primary">
                Amount
          </Typography>
          <TextField fullWidth onChange={value === 0 ? handleBuyInput : handleSellInput} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',endAdornment:<InputAdornment position="end">{isPut? 'Puts': 'Calls'}</InputAdornment>}}  />
          <Typography variant="caption" gutterBottom color="primary" marginBottom='5px'>
                Limit:{limit}
          </Typography>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant="overline" gutterBottom color="primary">
                Total Cost:
            </Typography>
            <Typography variant="caption" gutterBottom color="primary">
                ${totalCost}
            </Typography>
          </Stack>
          <Button variant="outlined" onClick = {value === 0 ? handleBuyClick :handleSellClick} sx={{marginTop :'20px'}}>Confirm</Button>
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Stack justifyContent="space-around" margin=' -18px -14px'>
        <Typography variant="overline" gutterBottom color="primary">
              Amount
        </Typography>
        <TextField fullWidth onClick = {value === 0 ? handleBuyClick :handleSellClick} onChange={value === 0 ? handleBuyInput : handleSellInput} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*',endAdornment:<InputAdornment position="end">{isPut? 'Puts': 'Calls'}</InputAdornment>}}  />
        <Typography variant="caption" gutterBottom color="primary" marginBottom='5px'>
              Limit:{limit}
        </Typography>

        <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant="overline" gutterBottom color="primary">
               Will Receive:
            </Typography>
            <Typography variant="caption" gutterBottom color="primary">
                ${totalCost}
            </Typography>
          </Stack>

        <Button variant="outlined" sx={{marginTop :'20px'}} onClick = {value === 0 ? handleBuyClick :handleSellClick}>Confirm</Button>
      </Stack>
      </TabPanel>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant="overline" gutterBottom color="primary">
                Position:
            </Typography>
            <Typography variant="caption" gutterBottom color="primary">
                {position === undefined ? '--' : position}
            </Typography>
          </Stack>
          <Stack direction='row' alignItems='center' justifyContent='space-between'>
            <Typography variant="overline" gutterBottom color="primary">
                Your P&L:
            </Typography>
            <Typography variant="caption" gutterBottom color="primary">
                $10
            </Typography>
          </Stack>
         </Stack>
    </Box>
  )
}
