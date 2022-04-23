import React, { memo, useCallback, useEffect, useRef } from "react";
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
  const handleLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const isDesktop = useMediaQuery("(min-width:600px)");

  const zoom = 15;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleCenterChanged = useCallback(() => {
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
        setCoordinates({ lat: newCenter?.lat(), lng: newCenter?.lng() });
        setBounds({ ne: newBoundNE, sw: newBoundSW });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, coordinates]);

  useEffect(() => {
    if(!isLoaded)return
    handleCenterChanged()
  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])
  

  const handleOnUnmount = useCallback(() => {
    mapRef.current = null
  }, [])

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <>
      {isLoaded ? (
        <Box
          sx={{
            height: "85vh",
            width: "100%",
          }}
        >
          <LoadScriptNext googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              //resetBoundsOnResize
              mapContainerStyle={{
                width: "100%",
                height: "100%",
              }}
              center={coordinates}
              onLoad={handleLoad}
              onUnmount={handleOnUnmount}
              onDragEnd={() => {
                if (mapRef.current !== null) {
                  handleCenterChanged()
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
                            width: "110px",
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
                              maxHeight: "75px",
                              backgroundPosition: "center",
                              backgroundSize: "cover"
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


export default memo(Map)
