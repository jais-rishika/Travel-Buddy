import { CssBaseline, Grid2 } from '@mui/material';
import { latLngBounds } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { getPlacesData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Maps from './components/Map/Map';
const App=()=>{
    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState(0);
    const [filteredPlaces,setFilteredPlaces]=useState([])
    const[places,setPlaces]=useState([]);
    const[coordinates,setCoordinates]=useState([0,0])
    const[bounds,setBounds]=useState(null);

    const [childClicked, setChildClicked] = useState(null);
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude, longitude}=position.coords;
            setCoordinates([latitude,longitude])
            const bound = latLngBounds(
                [latitude - 0.1, longitude - 0.1], // Southwest corner (adjust as needed)
                [latitude + 0.1, longitude + 0.1]  // Northeast corner (adjust as needed)
            );
            setBounds(bound)
        });
    },[])

    useEffect(()=>{
        const filteredPlaces= places?.filter((place)=> place.rating>rating)
        setFilteredPlaces(filteredPlaces)
    },[rating,places])

    useEffect(()=>{
        console.log(coordinates)
        setIsLoading(true)
        if(bounds){
            const ne=bounds._northEast;
            const sw=bounds._southWest;

            getPlacesData({type,ne,sw})
                .then((data)=>{
                    console.log(data)
                    setPlaces(data)
                    setFilteredPlaces([])
                    setIsLoading(false)
                }).catch((err)=>{
                    console.log(err)
                })
        }
    },[type,coordinates,bounds])
    return (
        <div>
            <CssBaseline/> 
            {/* Normalizez the styles */}
            <Header setCoordinates={setCoordinates} setBounds={setBounds}/>
            <Grid2 container spacing={3} style={{width: '100%'}}>
                <Grid2 item size={{xs:12 ,md:4}}>
                    <List places={filteredPlaces?.length? filteredPlaces:places}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                        childClicked={childClicked}
                        isLoading={isLoading}
                    />
                </Grid2>
                <Grid2 item size={{xs:12 ,md:8}}>
                    <Maps
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        bounds={bounds}
                        places={filteredPlaces?.length? filteredPlaces:places}
                        childClicked={childClicked}
                        setChildClicked={setChildClicked}
                    />
                </Grid2>
            </Grid2>
        </div>
    )
}
export default App;
