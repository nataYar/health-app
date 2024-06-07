"use client";
import { Box } from "@mui/material";
import { neutral } from "../theme/colors";

const GuestButton = () => {
  return (
   
      <Box
        component="span"
        sx={{
          color: neutral[400],
 
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "24px",
        
        }}
      >
        Hello, guest user
      </Box>

  );
};

export default GuestButton;
