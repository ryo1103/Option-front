import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect, useInactiveListener } from '../hooks';
import { injected } from '../connectors';
import "./index.css"
import {simplifyStr} from '../utils'
import { Link } from 'react-router-dom';

// import {Web3ReactProvider}  from

const ConnectButton = styled(Button)({
    width:'240px',
    textTransform: 'none',
    fontSize: 15,
    border: 'none',
    lineHeight: 2.4,
    backgroundColor: '#222148',
    cursor: 'pointer',
    borderRadius: '4px',
    boxShadow: '0 0 0 2px rgb(134 140 160 / 2%)',
    color: '#f9fafb',
    
    
    '&:hover': {
      backgroundColor: '#485bac66',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
  });



function Header(){
    const context = useWeb3React()
    const connectWallet = async() =>{
        try {
			await context.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
    }
    
    console.log(context)
    const {chainId, account, active, error: loginError, deactivate, library } = context;
    console.log(chainId, account, active)
    return (
        <div className='header'>
            <Stack spacing={2} direction="row">
                <div className='logo' style={{fontSize:'24px', marginRight:'80px'}}>📈 💰</div>
                <Link to={`/`} style={{textDecoration:'none'}}><Button variant="text" >Trade</Button></Link>
                <Link to={`/vault`} style={{textDecoration:'none'}}><Button variant="text" >Stake</Button></Link>
            </Stack>
            <ConnectButton onClick = {connectWallet} size='medium' variant="contained" > {active && account!==undefined && account ? simplifyStr(account) : 'connect wallet' }  </ConnectButton>
        </div>
    )
}

export default Header




