import { CircularProgress, FormControl, Grid2, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { createRef, useEffect, useState } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
const List=({places,setType,setRating,type,rating,childClicked,isLoading})=>{
    const [elRefs, setElRefs] = useState([]);
    useEffect(()=>{
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    },[places])
    useEffect(() => {
        if (childClicked !== null && elRefs[childClicked] && elRefs[childClicked].current) {
            setTimeout(() => {
                elRefs[childClicked].current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100); // Delay slightly
        }
    }, [childClicked, elRefs]);
    return(
        <Stack direction='column' sx={{padding: 4}} spacing={2}>
            <Typography variant='h5'>
            Restaurants, Hotels and Attractions around you!
            </Typography>
            {isLoading? (
                <div>
                    <CircularProgress size="5rem"/>
                </div>
            ):(
                <>
                    <Stack direction='row'>
                        <FormControl>
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e)=>setType(e.target.value)}>
                                <MenuItem value="restaurants">Restaurants</MenuItem>
                                <MenuItem value="hotels">Hotels</MenuItem>
                                <MenuItem value="attractions">Attractions</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Rating</InputLabel>
                            <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
                                <MenuItem value="0">All</MenuItem>
                                <MenuItem value="3">Above 3.0</MenuItem>
                                <MenuItem value="4">Above 4.0</MenuItem>
                                <MenuItem value="4.5">Above 4.5</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {places?.length?(
                        <Grid2 container style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            {places?.map((place,i)=>(
                                <Grid2 item key={i} size={{xs: 12}} >
                                    <PlaceDetails place={place}
                                        ref={elRefs[i]}
                                    />
                                </Grid2>
                            ))}
                        </Grid2>
                    ):
                    (<Typography variant='h4'>No Result Found</Typography>)
                    }
                </>
            )}
        </Stack>
    )
}
export default List;