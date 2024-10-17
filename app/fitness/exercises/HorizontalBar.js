"use client";
import { Box, List, Stack } from "@mui/material";

import ExerciseCard from './ExerciseCard';
import BodyPart from "./BodyPart";

const HorizontalBar = ({ data, bodyParts, handleBodyPartChange, bodyPart }) => {

  return (
    <Stack
      sx={{
        display: "flex",
        flexFlow:"row wrap",
        width: "100%",
        justifyContent: "center",
        alignItems:"center"
      }}
    >
      {data ? data.map((item, ind) => (
        <Box
          key={ind}
        >
          { bodyParts ? <BodyPart item={item} handleBodyPartChange={handleBodyPartChange} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
        </Box>
      )): null}
    </Stack>
  );
} 

export default HorizontalBar;
