// @ts-nocheck
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { useRequest } from 'ahooks';
import axios from 'axios'

export default function ChartComponent ({base}:any) {

  const [data, setData] = useState([])

  // btc:https://www.coingecko.com/ohlc/1/series/usd/24_hours.json
  // eth:https://www.coingecko.com/ohlc/1/series/usd/24_hours.json

 console.log('chart base', base)
 
  let getPrice = async () => {
    let btcUrl = 'https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=1'
    let ethUrl = 'https://api.coingecko.com/api/v3/coins/ethereum/ohlc?vs_currency=usd&days=1'
    let url = base === 'eth' ? ethUrl : btcUrl
    let test = await axios.get(url)
   // console.log('shuju ', test)
    let final = test?.data.map((itme)=>{
      let a ={}
      a['time'] = itme[0]
      a['open'] = itme[1]
      a['high'] = itme[2]
      a['low'] = itme[3]
      a['close'] = itme[4]
      return a
    })
   //  console.log('shuju ', final)
    setData(final)
  }

  useEffect(() => {
    getPrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])






	const	backgroundColor = '#ffffffbf'
	const 	lineColor = '#2962FF'
	const 	textColor = 'rgb(113 119 144 / 78%)'
	const 	areaTopColor = '#2962FF'
	const 	areaBottomColor = 'rgba(41, 98, 255, 0.28)'

	const chartContainerRef = useRef();
  

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addCandlestickSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);


  // 判断期权是btc 还是以太坊确定用哪个mock
	return (
		<div
			ref={chartContainerRef}
		/>
	);
};


