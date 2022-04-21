import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  LoadScriptNext,
  OverlayView,
} from "@react-google-maps/api";
import { Paper, Typography, useMediaQuery, Rating } from "@mui/material";
import LocationOnOutlineIcon from "@mui/icons-material/LocationOnOutlined";
import { Box } from "@mui/system";
import Spinner from "../Spinner/Spinner";

function Map({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) {
  const mapRef = useRef(null);
  const handleLoad = (map) => {
    mapRef.current = map;
  };
  const isDesktop = useMediaQuery("(min-width:600px)");
//   const [requestCounter, setRequestCounter] = useState(0);
//   const [requestState, setRequestState] = useState(false);
//   const [requestInterval, setRequestInterval] = useState(null);
  const zoom = 15;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAou1k3EVXFhA4HvNP_OPWPh7dsZpB7Zlc", // ,
    // ...otherOptions
  });

  //const centerOptions = useMemo(() => ({ lat: coordinates.lat, lng: coordinates.lng }), [coordinates])

  const handleCenterChanged = () => {
    if (
      mapRef.current !== undefined &&
      mapRef.current !== null &&
      mapRef.current.getBounds() !== undefined &&
      mapRef.current.getBounds() !== null
    ) {
      const newCenter = mapRef.current.getCenter();
      const newBoundNE = mapRef.current.getBounds().getNorthEast();
      const newBoundSW = mapRef.current.getBounds().getSouthWest();
      if (
        newCenter !== undefined &&
        setCoordinates !== undefined &&
        setBounds !== undefined
      ) {
        setCoordinates({ lat: newCenter.lat(), lng: newCenter.lng() });
        setBounds({ ne: newBoundNE, sw: newBoundSW });
      }
    }
  };

//   useEffect(() => {
//     let interval = null;
//     console.log(requestState);

//     if (requestState) { 
//       clearInterval(interval);
//       interval = setInterval(() => {
//         //if (requestState) return;
//         console.log(requestCounter);
//         setRequestCounter(requestCounter + 1);
//         if (requestCounter >= 3) {
//           handleCenterChanged()
//           setRequestCounter(0);
//           setRequestState(false);
//         }
//       }, 100);
//     } 

//     return () => {
//       clearInterval(interval);
//     };
//   }, [requestState, requestCounter]);

  //intervall ist false
  //onBound interval wird true
  //solange true ist counter auf 0
  //wenn false zähle hoch bis 3

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <>
      {isLoaded ? (
        <Box
          sx={{
            height: "96vh",
            width: "100%",
          }}
        >
          <LoadScriptNext googleMapsApiKey="AIzaSyAou1k3EVXFhA4HvNP_OPWPh7dsZpB7Zlc">
            <GoogleMap
              resetBoundsOnResize
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={coordinates}
              onLoad={handleLoad}
              onDragEnd={() => {
                if (mapRef.current !== null) {
                  handleCenterChanged();
                }
              }}
              onZoomChanged={() => {
                if (mapRef.current !== null) {
                  handleCenterChanged();
                }
              }}
              zoom={zoom}
            >
              {places?.map((place, id) => {
                if (!place.name) return null;
                return (
                  <OverlayView
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    position={{
                      lat: Number(place.latitude),
                      lng: Number(place.longitude),
                    }}
                    getPixelPositionOffset={(width, height) => ({
                      x: -(width / 2),
                      y: -(height / 2),
                    })}
                    key={id}
                  >
                    <div>
                      {place.name}
                      {!isDesktop ? (
                        <LocationOnOutlineIcon
                          color="primary"
                          fontSize="large"
                          onClick={() => setChildClicked(id)}
                        />
                      ) : (
                        <Paper
                          elevation={3}
                          sx={{
                            transform: "translate(-50%, -50%)",
                            position: "absolute",
                            padding: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "100px",
                            zIndex: 1,
                            "&:hover": { zIndex: 2 },
                          }}
                          onClick={() => setChildClicked(id)}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            {place.name}
                          </Typography>
                          <img
                            style={{
                              cursor: "pointer",
                            }}
                            src={
                              place.photo
                                ? place.photo.images.large.url
                                : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                            }
                            alt={place.name}
                          />
                          <Rating
                            size="small"
                            value={Number(place.rating)}
                            readOnly
                          />
                        </Paper>
                      )}
                    </div>
                  </OverlayView>
                );
              })}
              {/* Child components, such as markers, info windows, etc. */}
            </GoogleMap>
          </LoadScriptNext>
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Map;
