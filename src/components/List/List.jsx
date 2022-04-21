import React, { createRef, useEffect, useState } from "react";
import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import Spinner from "../Spinner/Spinner";

export default function List({
  places,
  type,
  setType,
  rating,
  setRating,
  childClicked,
  loading,
}) {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <Box
      sx={{
        padding: "25px",
        height: "100%",
      }}
    >
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      {loading ? (
        <Spinner />
      ) : (
        <>
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
              height: "83.5vh",
              overflow: "auto",
            }}
          >
            {places
              ? places.map((place, id) => {
                  return (
                    <Grid ref={elRefs[id]} item key={id} xs={12}>
                      <PlaceDetails
                        key={id}
                        place={place}
                        selected={Number(childClicked) === id}
                        refProp={elRefs[id]}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </>
      )}
    </Box>
  );
}
