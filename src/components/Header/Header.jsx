import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: ["none", null, "block", null, null],
          }}
        >
          Travel Advisor
        </Typography>
        <Box
          display="flex"
          sx={{
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              display: ["none", null, "block", null, null],
              pr: 2,
            }}
          >
            Explore new places
          </Typography>
          {/* <Autocomplete> */}
            <Box>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "8px",
                  backgroundColor: "rgba(255,255,255, 0.15)",
                  marginRight: 2,
                  marginLeft: [0, null, 0],
                  width: ["100%", "100%", "auto", "auto", "auto"],
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255, 0.25)",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 2,
                    height: "100%",
                    position: "absolute",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search..."
                  sx={{
                    padding: (theme) => theme.spacing(1, 1, 1, 0),
                    paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
                    transition: (theme) => theme.transitions.create("width"),
                    width: "100%",
                  }}
                />
              </Box>
            </Box>
          {/* </Autocomplete> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
