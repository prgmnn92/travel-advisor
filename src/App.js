import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getPlacesData } from "./api";

const theme = createTheme();

function App() {
  //places for map and list
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([])

  //type & rating filter for list
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);

  //coordinates & bounds for the map
  const [coordinates, setCoordinates] = useState()
  const [bounds, setBounds] = useState({})

  //For scroll into viewport in list
  const [childClicked, setChildClicked] = useState()

  //handle loading state
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)

    setFilteredPlaces(filteredPlaces)
  }, [rating, places])


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
      
  }, [])
  

  useEffect(() => {
    if(!bounds.sw && !bounds.ne) return
    setLoading(true)
    getPlacesData(bounds?.sw, bounds?.ne, type).then((data) => {
      setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      setFilteredPlaces([])
      setLoading(false)
    });
  }, [type, bounds]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid sx={{height: "100%"}} container spacing={3}>
          <Grid item sm={12} md={4}>
            <List setType={setType} setRating={setRating} type={type} rating={rating} places={filteredPlaces.length ? filteredPlaces : places} childClicked={childClicked} loading={loading}/>
          </Grid>
          <Grid item sm={12} md={8}>
            <Map 
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
