import SearchIcon from '@mui/icons-material/Search';
import { AppBar, InputBase, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';

import { alpha, styled } from '@mui/material/styles';


// Styled component for the search container
const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
    marginLeft: theme.spacing(2),
    paddingLeft: 2,
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

const Header = () => {
    return (
        <AppBar position='static' sx={{width:'100%'}}>
            <Toolbar>
                <Stack direction='row'  spacing={45} sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='h5' sx={{ display: { xs: 'none', sm: 'block' } }}>
                        Travel Advisor
                    </Typography>
                    <Stack direction='row' sx={{justifyContent: 'center'}} spacing={5}>
                        <Typography variant='h6' sx={{justifyContent: 'center'}}>
                            Explore New Places
                        </Typography>
                        {/* <Autocomplete> */}
                            <SearchContainer>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder='Search...'
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </SearchContainer>
                        {/* </Autocomplete> */}
                    </Stack>
                </Stack>            
            </Toolbar>
        </AppBar>
    );
};

export default Header;