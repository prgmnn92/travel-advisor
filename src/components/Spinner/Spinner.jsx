import { CircularProgress } from "@mui/material";
import React from "react";

export default function Spinner() {
  return (
    <div
      style={{
        height: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size="5rem" />
    </div>
  );
}
