import "./index.css"
import { useEffect, useState } from "react";
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import banner from '../assets/images/banner.png'
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import optionList from "../config/option";
import CardItem from "./cardItem";
import { flexbox } from "@mui/system";
import Typography from '@mui/material/Typography';
import TabPanel from './tabpanel'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import OptionBoard from "./optionBoard";
import { Link } from 'react-router-dom'




const StartButton = styled(Button)({
    boxShadow: 'none',
    width:'200px',
    textTransform: 'none',
    fontSize: 16,
    padding: '8px 26px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: '#3a6df0',
    cursor: 'pointer',
    transition: '0.3s',
    whiteSpace: 'nowrap',
    borderRadius: '20px',
    marginTop: '20px',
    color:'#fff',
    

    '&:hover': {
      backgroundColor: '#3a6df0',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  });
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Homepage(){
    const [asset, setAsset] = useState('all')
    const [state, setState] = useState('all')
   // const [optionAfterAsset, setOptionAfterAsset] = useState<any>(optionList)
   // const [optionAfterState, setOptionAfterState] = useState<any>(optionList)
    const [finalOption, setFinalOption] = useState<any>(optionList)
    const [tabNumber, setTabNumber] = useState(0);
    const usersOption = optionList
  
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabNumber(newValue);
    };


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
        <div>
        <div className='banner'>
            <div className="banner-slogan">
            <Typography variant="h3" color='primary' align='left' display='block'>
                Deoption
            </Typography>
            <Typography variant="h6" color='primary' align='left' display='block' marginTop='30px'>
                The simplest option. More efficiency , More freedom and more for you.
            </Typography>
            <Link to={`/option/btcCall`} style={{textDecoration:'none'}}>
                <StartButton variant="contained" size="medium">Start to Trade!</StartButton>
            </Link>
            </div>
            <img src={banner} width='360' style={{marginLeft: '-20px'}}/>
            
        </div>
        <div className="option-container">
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabNumber} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label="Options" {...a11yProps(0)} />
            <Tab label="My Options" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabNumber} index={0}>
            <OptionBoard optionList={optionList}/>
        </TabPanel>
        <TabPanel value={tabNumber} index={1}>
            <OptionBoard optionList={usersOption}/>
        </TabPanel>

      </Box>
      </div>


       {/* <div className="option-container">
            <Typography variant="h6" color='#999ba5' align='left' display='block'>
                all options:
            </Typography>
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
            <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-between', marginTop:'20px'}}>
                {
                    Object.keys(finalOption).map((item:any) => <CardItem  key={item} name={item} isExpire={finalOption[item][1] === 'expire'} isSoldOut={finalOption[item][1] === 'expire'}/>)
                }
            </div>
            </div> */}
        </div>
    )
}

export default Homepage