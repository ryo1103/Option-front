import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Header  from './compoment/header';
import Homepage from './compoment/homepage';
import { Routes, Route } from 'react-router-dom'
import Trade from './compoment/trade';
import Vault from './compoment/vault';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div style={{position:'fixed', right:0, top:0, width:'100%', height:'100%'}} >
          <video style={{width: '100%', height: '100%',objectFit: "cover"}} muted autoPlay loop>
            <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
      </div>

      <Header/>

      
      <div className='app-body'>
        
        <Routes>
              <Route path="/" element={<Homepage/>} />
              <Route path="/option/:address" element={<Trade/>} />
              <Route path="/vault" element={<Vault/>} />

        </Routes>
      </div>

      
    </ThemeProvider>

   
    
  );
}

export default App;
