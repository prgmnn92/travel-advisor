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
  const [places, setPlaces] = useState([]);
  
  const [coordinates, setCoordinates] = useState()
  const [bounds, setBounds] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: { latitude, longitude }}) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  

  }, [])
  

  useEffect(() => {
    if(!bounds) return
    getPlacesData(bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      console.log(data)
    });
  }, [coordinates, bounds]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Grid container spacing={3}>
          <Grid item sm={12} md={4}>
            <List places={places}/>
          </Grid>
          <Grid item sm={12} md={8}>
            <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default App;
