"use client";
import { Stack, Typography } from "@mui/material";

const BodyPart = ({ item, bodyPart, handleBodyPartChange}) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      sx={
        bodyPart === item
          ? {
              borderRadius: "10px",
              cursor: "pointer",
              padding:"5px",
              marginRight:"10px",
              backgroundColor: "primary.main",
              color: "white"
            }
          : {
              borderRadius: "10px",
              cursor: "pointer",
              padding:"5px",
              marginRight:"10px",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white"
              },
            }
      }
      onClick={() => {
        handleBodyPartChange(item);
      }}
    >
      <Typography
       sx={{
        textTransform: "uppercase",
       }}
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default BodyPart;
