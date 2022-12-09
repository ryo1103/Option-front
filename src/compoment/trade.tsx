
import { useParams } from 'react-router-dom'
import React, { useState, useCallback, useEffect} from 'react';
import EthBackIcon from '../assets/images/ethBackIcon';
import BtcBackIcon from '../assets/images/btcBackIcon';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import "./index.css"
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import MyChart from './chart';
import TradingBox from './tradingBox'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { getOracleContract, compare, getLiquidityPoolContract} from '../utils'
import { useRequest } from 'ahooks';
import { useTokenContract,useOptionContract} from '../hooks/useContract';
import { usdt } from '../config';
import { formatEther, parseEther } from "@ethersproject/units";
import {options} from '../config';
import ChartComponent from './chart1'
import optionList from "../config/option";


/**
 * 页面布局 首先第一行是 已经卖出多少代币了， 代币最高可能收益是多少， 还可以卖多少token ribbon页面
 * 左面是k线 和期权价格 ， 右面是买卖界面
 */

 const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#3a6df0',
    },
  }));


const chartBoxStyle = {
    background: 'rgba(36, 39, 59, 0.3)',
    width: '70%',
    borderRadius: '10px 0 0 10px',
    padding: '10px 0 10px 0'
}

const TradeBoxStyle = {
    width: '30%',
    background: 'rgba(16 18 27 / 40%)',
    borderRadius: '0 10px 10px 0',
    padding: '5px 0 10px 0'

}


function Trade(){
    const params = useParams();
    const optionName = params['address']
    // @ts-ignore
    const baseToekn = optionList[optionName]?.underlyingAsset
    // @ts-ignore
    const showName = optionList[optionName]?.showName

    // 通过params 查询已经出售多少token了，再查一下保证金剩余的钱
    const [soldToken, setSoldToken]  = useState<number>(0)
    const [leftMargin, setLeftMargin] =  useState<number>(1000) //或者是我存的初始值
    const [soldRatio, setSoldRatio] = useState(100 * soldToken/leftMargin) // 进度条是百分数
    const [underlyingPrice, setUnderlyingPrice] = useState(0)
    const [optionPrice, setOptionPrice] = useState<any>(undefined)
    const [expireTime, setExpireTime] = useState(202011)
    const [strikePrice, setStrikePrice] = useState(16000)
    const [limit, setLimit] = useState(0)
    const [time, setTime] = useState(0)
    const [position, setPosition] = useState<any>(undefined)
    const context = useWeb3React()
    const { chainId, account,library, error: loginError } = context
    // @ts-ignore
    const oracle = getOracleContract(library, account)
    const tokenContract = useTokenContract(usdt)
    // @ts-ignore
    const optionContract = useOptionContract(options[optionName])

    // @ts-ignore
    const liquidityPool = getLiquidityPoolContract(library, account)


    const { run: getPrice, data: getPriceRes, error: getPriceError } = useRequest(() => oracle.getLastPrice(optionName), {
        manual: true,
        pollingInterval: 10000,
        pollingWhenHidden: false
      })

    const { run: getPosition, data: getPositionRes, error: getPositionError } = useRequest(() => optionContract?.balanceOf(account), {
        manual: true,
        refreshDeps: [account],
        pollingInterval: 5000,
        pollingWhenHidden: false
      })
    
    const { run: getSold, data: getSoldnRes, error: getSoldError } = useRequest(() => optionContract?.totalSupply(), {
        manual: true,
        pollingInterval: 15000,
        pollingWhenHidden: false
      })

  /*  const { run: getMargin, data: getMarginRes, error: getMarginError } = useRequest(() => liquidityPool?.userTotalDepositValue(), {
        manual: true,
        pollingWhenHidden: false
      }) */

    useEffect(() => {
        // approveHCT()
            getPrice()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []) 
    useEffect(() => {
        // approveHCT()
            getSold()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []) 

  /*  useEffect(() => {
        // approveHCT()
            getMargin()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])  */
    
    useEffect(() => {
        // approveHCT()
        if (account){
            getPosition()
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [account]) 
    
    useEffect(() => {
        if (getSoldnRes) {
            // @ts-ignore
            console.log('售出', getSoldnRes)
            // @ts-ignore
            setSoldToken(Number(getSoldnRes))
            setSoldRatio(100 * Number(getSoldnRes)/leftMargin)
            //  setBalance(getBalanceRes)
        }
        }, [getPositionRes])
    
  /*  useEffect(() => {
        if (getMarginRes) {
            // @ts-ignore
            console.log('最大可售出', getMarginRes)
            // @ts-ignore
            setLeftMargin(formatEther(getMarginRes))
            //  setBalance(getBalanceRes)
        }
        }, [getMarginRes]) */

    useEffect(() => {
        if (getPositionRes) {
            // @ts-ignore
            console.log('仓位数据', getPositionRes)
            // @ts-ignore
            setPosition(Number(getPositionRes))
            //  setBalance(getBalanceRes)
        }
        }, [getPositionRes])

    useEffect(() => {
        if (getPriceRes) {
            // @ts-ignore
            console.log('价格数据', getPriceRes, formatEther(getPriceRes?.optionPrice))
            // @ts-ignore
            setOptionPrice(formatEther(getPriceRes?.optionPrice))
            // @ts-ignore
            setUnderlyingPrice(getPriceRes?.underlyingPrice.toString())
            // @ts-ignore
            setLimit(getPriceRes?.amount.toString())
            // @ts-ignore
            setTime(formatEther(getPriceRes?.timestamp))
            //  setBalance(getBalanceRes)
        }
        }, [getPriceRes])

    useEffect(() => {
            if (getPriceError) {
                // @ts-ignore
                console.log('价格数据错误', getPriceError)//formatEther(getPriceRes?.optionPrice))
            }
            }, [getPriceError])



    useEffect(()=>{
        //用来查询 卖了多少币和剩余多少币的

    },[])

  //  console.log(params,'参数')

    return (
        <>  
    
        <div>
            <div className='jKRYBY'></div>
                <Stack direction="row" justifyContent="space-between" width='60%' maxWidth='800px' margin='0 auto' height='200px' overflow='hidden'>
                    <Box width='60%' maxWidth='400px' marginTop='50px'>
                        <Typography variant="h3" gutterBottom color='primary'>
                            {showName}
                        </Typography>
                        <Stack direction="row" justifyContent="space-between" marginTop='15px'>
                            <Typography variant="caption" gutterBottom color='#bebfc8'>
                                Current Sold
                            </Typography>
                            <Typography variant="caption" gutterBottom color='primary'>
                                {soldToken}
                            </Typography>
                        </Stack>
                        <BorderLinearProgress variant="determinate" value={soldRatio} />
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="caption" gutterBottom color='#bebfc8'>
                                Max number can be sold
                            </Typography>
                            <Typography variant="caption" gutterBottom color='primary'>
                                {leftMargin}
                            </Typography>
                        </Stack>
                    </Box>                    
                    <div>
                        {
                            baseToekn === 'eth' ?<EthBackIcon width='300px'/> :<BtcBackIcon width='300px'/> 
                        }
                        </div>                    
                </Stack>
            <div className='kYcMqO'></div>
            <Stack direction="row" justifyContent="space-between" width='60%' maxWidth='800px' margin='0 auto' >
                

                    <Box className='chart-side' sx={chartBoxStyle} >
                        <Stack direction="column" >
                                <Stack direction="row" justifyContent="space-between" padding='5px 20px 0 20px'>
                                    <Stack direction="row"  alignItems='center'>
                                    {baseToekn === 'eth'? <EthBackIcon width='30px'/> : <BtcBackIcon width='30px'/> }
                                        <Typography variant="caption"  gutterBottom color='primary' fontSize='16px' marginLeft='10px'>
                                            {showName}
                                        </Typography>
                                    </Stack>
                                    <Box>
                                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                                             Current Price 
                                        </Typography>
                                        <Typography variant="overline" display="block" gutterBottom color='primary' textAlign='end' fontSize='14px' marginTop='-8px'>
                                             ${underlyingPrice ?underlyingPrice : '----'}
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between" padding='0 20px'>
                                    <Stack direction="row" justifyContent="space-between" width='40%'>
                                    <Box>
                                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                                            Expire Time
                                        </Typography>
                                        <Typography variant="overline" display="block" gutterBottom color='primary' fontSize='14px' marginTop='-8px'>
                                            {expireTime}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                                            Strike Price
                                        </Typography>
                                        <Typography variant="overline" display="block" gutterBottom color='primary' fontSize='14px' marginTop='-8px'>
                                            {strikePrice}
                                        </Typography>
                                    </Box>
                                    </Stack>
                                    
                                    <Box>
                                        <Typography variant="caption" display="block" gutterBottom color='primary'>
                                            P&L 
                                        </Typography>
                                        <Typography variant="overline" display="block" gutterBottom color='primary' fontSize='14px' marginTop='-8px'>
                                           24%
                                        </Typography>
                                    </Box>

                                </Stack>
                            { /* <MyChart></MyChart> */ }
                            <ChartComponent base={baseToekn}></ChartComponent>
                        </Stack>
                    </Box>
                

                <Box className="trade-side"  sx={TradeBoxStyle}>
                    <TradingBox price={optionPrice} limit={limit} optionName={optionName} time={time} position={position}></TradingBox>
                </Box>
            </Stack>
        </div>
        </>
    )

}
export default Trade
