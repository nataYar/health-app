"use client";
import { useState, useEffect } from "react";

import HorizontalBar from "./HorizontalBar";
import { exerciseOptions, fetchData } from "@/app/utils/exerciseData";
import {
  Box,
} from "@mui/material";
import Exercises from "./Exercises";


const Exercise = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);
useEffect(()=>{
  console.log(bodyParts),
  console.log(exercises)
}, bodyParts)
  return (
        <Box sx={{ width: "100%" }}>
          <HorizontalBar
            data={bodyParts}
            bodyPart={bodyPart}
            bodyParts={bodyParts}
            setBodyPart={setBodyPart}
          />
          <Exercises bodyPart={bodyPart} exercises={exercises} setExercises={setExercises}/>
         {/* <ExercisesNextPagination /> */}
        </Box>


  );
};

export default Exercise;

