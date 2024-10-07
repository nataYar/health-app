'use client'
import { Stack } from "@mui/material";

const Wrapper = ({ children }) => {
  return (
    <Stack
    direction='column'
      sx={{
        padding: { 
          xs: "90px 20px 20px 20px", 
          md: "100px 30px 30px 270px" },
        display: "flex",
        flexFlow: 'column wrap',
        alignItems: {xs: 'center', sm: 'flex-start'},
        width: "100%",
        height: "auto",
        minHeight: "100vh",
        backgroundColor: 'neutral.100',
      }}
    >
      {children}
    </Stack>
  );
};

export default Wrapper;
