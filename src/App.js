import { CssBaseline, Grid2 } from '@mui/material';
import React from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Maps from './components/Map/Map';
const App=()=>{
    return (
        <div>
            <CssBaseline/> 
            {/* Normalizez the styles */}
            <Header/>
            <Grid2 container spacing={3} style={{width: '100%'}}>
                <Grid2 item size={{xs:12 ,md:4}}>
                    <List/>
                </Grid2>
                <Grid2 item size={{xs:12 ,md:8}}>
                    <Maps/>
                </Grid2>
            </Grid2>
            Hello World!!
        </div>
    )
}
export default App;