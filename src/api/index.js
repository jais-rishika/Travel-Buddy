import axios from "axios";
// require("dotenv").config()

export const getPlacesData= async({type,ne,sw})=>{
    try {
        const {data: {data}}= await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          lang: 'en_US'
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL,
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
        }}
        );
        return data
    } catch (error) {
        console.log(error)
    }
}
