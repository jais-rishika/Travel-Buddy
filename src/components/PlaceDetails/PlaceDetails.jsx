import { LocationOn, Phone } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Rating, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
const PlaceDetails=forwardRef(({place},ref)=>{
    return(
        place.name? 
        <Card ref={ref} sx={{ maxWidth: 350, margin: '16px', boxShadow: 3 }}>
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNLEL-qmmLeFR1nxJuepFOgPYfnwHR56vcw&s'}
                title={place.name}
            />
            <CardContent>
                <Typography>
                    <i><b>{place.name}</b></i>
                </Typography>
                <Box>
                    <Rating name="read-only" value={Number(place.rating)} readOnly />
                    <Typography component="legend">{place.num_reviews>=1?place.num_reviews+" review":""}{place.num_reviews > 1 && 's'}</Typography>
                </Box>
                {place.price_level && (
                <Box display="flex" flexDirection='row' justifyContent='space-between'>
                    <Typography sx={{marginTop: 0.2}} variant='subtitle2' ><b>Price: </b></Typography>
                    <Typography gutterBottom variant="subtitle2">
                         {place.price_level}
                    </Typography>
                </Box>)}
                {place.ranking && (
                <Box display="flex" flexDirection='row' justifyContent='space-between'>
                    <Typography variant='subtitle2' sx={{marginTop: -0.1 }} ><b>Ranking: </b></Typography>
                    <Typography gutterBottom variant="subtitle2">
                         {place.ranking}
                    </Typography>
                </Box>)}
                {place.awards?.map((award) => (
                <Box display="flex" my={1} alignItems="center">
                    <img src={award.images.small} />
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                </Box>
                ))}
                {place?.cuisine?.map(({name})=>(
                    <Chip key={name} size="small" label={name} sx={{margin: 0.5}}/>
                ))
                }
                {place.address &&(
                    <Box display='flex' flexDirection='row' marginTop={2}>
                        <LocationOn fontSize='small' sx={{marginRight: 1}}/> 
                        <Typography sx={{lineHeight:1 }} variant='subtitle1'>{place.address}</Typography>
                    </Box>
                )}
                {place.phone?<hr/>:""}
                {place.phone &&(
                    <Box display='flex' flexDirection='row'>
                        <Phone fontSize='small' sx={{marginRight: 1}}/> 
                        <Typography variant='subtitle1'>{place.phone}</Typography>
                    </Box>
                )}
            </CardContent>
            <CardActions>
                {place.web_url && (<Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>Trip Advisor</Button>)}
                {place.website && (<Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>Website</Button>)}
            </CardActions>
        </Card>:""
    )
})
export default PlaceDetails;