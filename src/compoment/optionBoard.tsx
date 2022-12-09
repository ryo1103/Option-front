
import optionList from "../config/option";
import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CardItem from "./cardItem";
import { Stack } from "@mui/system";

function OptionBorad({optionList}:any){
    const [asset, setAsset] = useState('all')
    const [state, setState] = useState('all')
   // const [optionAfterAsset, setOptionAfterAsset] = useState<any>(optionList)
   // const [optionAfterState, setOptionAfterState] = useState<any>(optionList)
    const [finalOption, setFinalOption] = useState<any>(optionList)
     // 像lp挖矿的池子一样 手动添加option 获取全部option multicall 看过没过期

     const handleAssetChange = (event: SelectChangeEvent) => {
        setAsset(event.target.value);
      };
    const handleStateChange = (event: SelectChangeEvent) => {
        setState(event.target.value);
      };

    function filterAsset(){
        let tempt = {}
        if (asset === 'all'){
            tempt = optionList
        }else{
           // console.log(optionAfterState)
            for (let i in optionList){
                // @ts-ignore
                if (optionList[i][0] === asset){
                    // @ts-ignore
                    tempt[i] = optionList[i]
                }
            }
        }
        console.log(22222,tempt,asset)
        return tempt
    }

    function filterState(optionAfterAsset:any){
        console.log('...',state,optionAfterAsset)
        let tempt = {}
        if (state === 'all'){
            tempt = optionAfterAsset
        }else{
             console.log('ppp',optionList)
            for (let i in optionAfterAsset){
                // @ts-ignore
                if (optionList[i][1] === state){
                 // @ts-ignore   
                    tempt[i] = optionList[i]
                }
            }
        }
        return tempt
    }




    useEffect(()=>{
        const optionAfterAsset = filterAsset()
        const tempt = filterState(optionAfterAsset)
        setFinalOption(tempt)
    },[asset, state])

   

    console.log('筛选结果', finalOption, Object.keys(finalOption))

    return (
        <>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">Asset</InputLabel>
        <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={asset}
            label="Asset"
            onChange={handleAssetChange}
        >
            <MenuItem value={'btc'}>BTC</MenuItem>
            <MenuItem value={'eth'}>ETH</MenuItem>
            <MenuItem value={'all'}>ALL</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">State</InputLabel>
        <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={state}
            label="State"
            onChange={handleStateChange}
        >
            <MenuItem value={'running'}>Running</MenuItem>
            <MenuItem value={'expire'}>Expire</MenuItem>
            <MenuItem value={'all'}>ALL</MenuItem>
        </Select>
        </FormControl>
        <Stack direction='row'  justifyContent='space-between' marginTop='20px' sx={{flexFlow:'wrap'}}>
            {
                Object.keys(finalOption).map((item:any) => <CardItem showName={finalOption[item].showName} key={item} name={item} isExpire={finalOption[item].expire} isSoldOut={finalOption[item]?.expire === 'expire'}  base={finalOption[item]?.underlyingAsset} strike={finalOption[item]?.strike} address= {finalOption[item]?.address} />)
            }
        </Stack>
        </>
    )

}
export default OptionBorad