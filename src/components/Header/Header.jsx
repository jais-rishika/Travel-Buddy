import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, IconButton, InputBase, Stack, TextField, Toolbar, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import { latLngBounds } from 'leaflet';
import React, { useState } from 'react';

// Styled component for the search container
const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginLeft: theme.spacing(2),
    padding: -1,
    width: 'auto',
}));

// Styled component for the search icon
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

// Styled component for the input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    padding: theme.spacing(0, 1, 0, 5),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch' },
}));

export const Header = ({setCoordinates, setBounds}) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent default form submission
        if (query) {
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=1`);
                if (response.data.length > 0) {
                    console.log(response.data)
                    const { lat, lon } = response.data[0];
                    setCoordinates([lat, lon]); // Call the function to set coordinates
                    const latNum = parseFloat(lat);
                    const lonNum = parseFloat(lon);
                    const bounds = latLngBounds(
                        [latNum - 0.1, lonNum - 0.1], // Southwest corner
                        [latNum + 0.1, lonNum + 0.1]  // Northeast corner
                    );
                    setBounds(bounds); // Get latitude and longitude from the first result
                    console.log(`Coordinates: Latitude: ${lat}, Longitude: ${lon}`);
                } else {
                    console.error("No results found");
                }
            } catch (error) {
                console.error("Error fetching coordinates", error);
            }
        }
    };

    return (
        <AppBar position='static' sx={{ width: '100%' }}>
            <Toolbar>
                <Stack direction='row' spacing={45} sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='h5' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Travel Advisor
                    </Typography>
                    <Stack direction='row' sx={{ justifyContent: 'center' }} spacing={5}>
                        <Typography variant='h6' sx={{ justifyContent: 'center'}}>
                            Explore New Places
                        </Typography>
                        <Box sx={{ position: 'relative' }}>
                            <SearchContainer sx={{height: '40px', marginLeft:'2px'}}>
                                <TextField
                                    variant="standard"
                                    placeholder='Search...'
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    InputProps={{
                                        endAdornment: (
                                                <IconButton onClick={handleSearch}>
                                                    <SearchIcon/>
                                                </IconButton>
                                        ),
                                        sx: { paddingLeft: '8px', backgroundColor:'transparent' }
                                    }}
                                    sx={{ width: 300 ,height: '40px'}}
                                />
                            </SearchContainer>
                            
                        </Box>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
        )
}
export default Header;