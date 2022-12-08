import { useParams } from 'react-router-dom'
import React, { useState, useCallback, useEffect } from 'react'
import EthBackIcon from '../assets/images/ethBackIcon'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import './index.css'
import { styled } from '@mui/material/styles'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import MyChart from './chart'
import TradingBox from './tradingBox'
/**
 * 页面布局 首先第一行是 已经卖出多少代币了， 代币最高可能收益是多少， 还可以卖多少token ribbon页面
 * 左面是k线 和期权价格 ， 右面是买卖界面
 */

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#3a6df0'
  }
}))

const chartBoxStyle = {
  background: 'rgba(16 18 27 / 40%)',
  width: '70%'
}

function Trade() {
  const params = useParams()
  const optionName = params['address']
  // 通过params 查询已经出售多少token了，再查一下保证金剩余的钱
  const [soldToken, setSoldToken] = useState<number>(100)
  const [leftMargin, setLeftMargin] = useState<number>(1000) //或者是我存的初始值
  const [soldRatio, setSoldRatio] = useState((100 * soldToken) / leftMargin) // 进度条是百分数

  useEffect(() => {
    //用来查询 卖了多少币和剩余多少币的
  }, [])

  console.log(params, '参数')

  return (
    <>
      <div>
        <div className="jKRYBY"></div>
        <Stack direction="row" justifyContent="space-between" width="60%" maxWidth="800px" margin="0 auto" height="200px" overflow="hidden">
          <Box width="60%" maxWidth="400px" marginTop="50px">
            <Typography variant="h3" gutterBottom color="primary">
              {optionName}
            </Typography>
            <Stack direction="row" justifyContent="space-between" marginTop="15px">
              <Typography variant="caption" gutterBottom color="#bebfc8">
                Current Sold
              </Typography>
              <Typography variant="caption" gutterBottom color="primary">
                {soldToken}
              </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={soldRatio} />
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="caption" gutterBottom color="#bebfc8">
                Max number can be sold
              </Typography>
              <Typography variant="caption" gutterBottom color="primary">
                {leftMargin}
              </Typography>
            </Stack>
          </Box>
          <Box>
            <Stack justifyContent="center" height="80px" marginTop="110px">
              <Typography variant="body1" gutterBottom color="#bebfc8">
                持仓数量：180
              </Typography>
              <Typography variant="body1" gutterBottom color="#bebfc8">
                盈亏：105%
              </Typography>
            </Stack>
          </Box>
          {/* <div >
            <EthBackIcon width="300px" />
          </div> */}
        </Stack>
        <div className="kYcMqO"></div>
        <Stack direction="row" justifyContent="space-between" width="60%" maxWidth="800px" margin="0 auto">
          <Box className="chart-side" sx={chartBoxStyle}>
            <MyChart></MyChart>
          </Box>
          <Box className="trade-side" sx={{ marginLeft: '30px' }}>
            <TradingBox></TradingBox>
          </Box>
        </Stack>
      </div>
    </>
  )
}
export default Trade
