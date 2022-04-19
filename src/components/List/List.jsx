import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import PlaceDetails from "../PlaceDetails/PlaceDetails";

export default function List({places}) {
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  
  return (
    <Box
      sx={{
        padding: "25px",
      }}
    >
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl
        sx={{
          margin: 1,
          minWidth: 120,
          marginBottom: "30px",
        }}
      >
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        sx={{
          margin: 1,
          minWidth: 120,
          marginBottom: "30px",
        }}
      >
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={(e) => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={3}
        sx={{
          height: "75vh",
          overflow: "auto",
        }}
      >
        {places.map((place, id) => (
          <Grid item key={id} xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

const styles = () => ({
  selectEmpty: {
    marginTop: (theme) => theme.spacing(2),
  },
  loading: {
    height: "600px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    padding: "25px",
  },
  marginBottom: {
    marginBottom: "30px",
  },
  list: {
    height: "75vh",
    overflow: "auto",
    p: 4,
  },
});
