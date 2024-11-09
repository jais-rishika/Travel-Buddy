import { Paper, Rating, Stack, Typography, useMediaQuery } from '@mui/material';
import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// import Rating from '@mui/material';
// import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';

const MapView=({coordinates,setCoordinates,setBounds})=>{
  const map = useMap();

  // Use this effect to set the view whenever coordinates change
  useEffect(() => {
      if (coordinates) {
          map.setView(coordinates, 14); // Adjust the zoom level as needed
      }
  }, [coordinates, map]);

  const customIconsmall=new icon({
    iconUrl:'https://img.icons8.com/?size=100&id=Udrc3LA8OPbn&format=png&color=000000',
    iconSize: [50,50]
  })

  // useEffect(()=>{
  //   const handleMoveEnd= ()=>{
  //     const {lat,lng}=map.getCenter()
  //     setCoordinates([lat,lng])
  //     const bounds=map.getBounds();
  //     const northEast = bounds._northEast; 
  //     const southWest = bounds._southWest;
  //     console.log(bounds)
  //     setBounds([northEast.lat,northEast.lng],[southWest.lat,southWest.lng])
  //   }
  //   map.on('moveend',handleMoveEnd);
  
  // },[setCoordinates,setBounds,map])
  return (
    <>
        <Marker position={coordinates} icon={customIconsmall}>
        </Marker>
    </>
);
}
const Maps=({setCoordinates,setBounds,coordinates,places,childClicked,setChildClicked})=>{
    let isDektop=useMediaQuery('(min-width:600px)')
    const customIconsmall=new icon({
      iconUrl:'https://img.icons8.com/?size=100&id=c0kUjxdWTRsk&format=png&color=000000',
      iconSize: [20,20]
    })
    const customIconLarge=new icon({
      iconUrl:'https://img.icons8.com/?size=100&id=c0kUjxdWTRsk&format=png&color=000000',
      iconSize: [40,40]
    })
  return (
    <Stack sx={{height: '100vh', width:'100%'}}>
        <MapContainer 
            center={coordinates} 
            zoom={10} 
            style={{ height: '100vh', width: '100%' }}
            dragging={(e)=>{
            }}
        >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {places && places.filter(place => place.latitude && place.longitude).map((place,i)=>(
          <Marker position={[place.latitude,place.longitude]} key={i} sx={{position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1, '&:hover': { zIndex: 2 }}} icon={isDektop?customIconLarge:customIconsmall}>
          <Popup>
            <div onClick={()=> setChildClicked(i)}>
              <Paper elevation={3} sx={{ padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px' }}>
                <Typography variant="subtitle2" gutterBottom>{place.name}</Typography>
                <img src={place.photo ? place.photo.images.large.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'} alt={place.name} />
                <Rating size="small" value={Number(place.rating)} readOnly />              
              </Paper>
            </div>
          </Popup>
          </Marker>
        ))}
        <MapView coordinates={coordinates} setCoordinates={setCoordinates} setBounds={setBounds}/>
        </MapContainer>
    </Stack>
  );
}
export default Maps;
