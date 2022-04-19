import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Paper, Typography, useMediaQuery, Rating } from "@mui/material";
import LocationOnOutlineIcon from "@mui/icons-material/LocationOnOutlined";
import { Box } from "@mui/system";

function Map({ setCoordinates, setBounds, coordinates }) {
  const mapRef = useRef(null);
  const handleLoad = (map) => {
    mapRef.current = map;
  };

  const isMobile = useMediaQuery("(min-width:600px)");

  const zoom = 11;

  //const centerOptions = useMemo(() => ({ lat: coordinates.lat, lng: coordinates.lng }), [coordinates])


  const handleCenterChanged = useCallback(() => {
    if (mapRef.current !== undefined && mapRef.current !== null) {
      const newCenter = mapRef.current.getCenter()
      const newBoundNE = mapRef.current.getBounds().getNorthEast()
      const newBoundSW = mapRef.current.getBounds().getSouthWest()
      if (newCenter !== undefined && setCoordinates !== undefined) {
        setCoordinates({ lat: newCenter.lat(), lng: newCenter.lng() })
        setBounds({ ne: newBoundNE, sw: newBoundSW })
      }
    }
  }, [mapRef, setCoordinates])




  return (
    <Box
      sx={{
        height: "85vh",
        width: "100%",
      }}
    >
      <LoadScript googleMapsApiKey="AIzaSyAou1k3EVXFhA4HvNP_OPWPh7dsZpB7Zlc">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
          }}
          center={coordinates}
          onLoad={handleLoad}
          onDragEnd={() => {
            if (mapRef.current !== null) {
              handleCenterChanged()
            }
          }}
          onZoomChanged={() => {
            if (mapRef.current !== null) {
              handleCenterChanged()
            }
          }}
          zoom={10}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </Box>
  );
}

const styles = () => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    "&:hover": { zIndex: 2 },
  },
  pointer: {
    cursor: "pointer",
  },
});

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);


const memoMap = memo(Map)
export default memoMap