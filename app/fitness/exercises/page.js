"use client";
import { useState, useEffect } from "react";

import HorizontalBar from "./HorizontalBar";
import { exerciseOptions, fetchData } from "@/app/utils/exerciseData";
import { Box } from "@mui/material";
import Exercises from "./Exercises";

const Exercise = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([])


  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        const partsUrl = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';
        const exercisesUrl = 'https://exercisedb.p.rapidapi.com/exercises?limit=1000&offset=0';
        
       
        const exercisesData = await fetchData(exercisesUrl, exerciseOptions);
        setExercises(exercisesData)

        const partsData = await fetchData(partsUrl, exerciseOptions);
        const updatedPartsData = partsData.filter(part => part !== "neck"); //because there are no exercises for neck in Exersice Db
        setBodyParts(['all', ...updatedPartsData]);
        
      } catch (error) {
        console.error('Error fetching exercises data:', error);
      }
    };
  
    fetchExercisesData();
  }, []);

const changeBodyPart = (el) => {
  setBodyPart(el)
}

const pickExercises = (el) => {
  setExercises(el)
}
  return (
        <Box sx={{ width: "100%" }}>
          <HorizontalBar
            data={bodyParts}
            bodyPart={bodyPart}
            bodyParts={bodyParts}
            handleBodyPartChange={changeBodyPart}
          /> 

          <Exercises bodyPart={bodyPart} exercises={exercises} changeExercises={pickExercises}/>
        </Box>


  );
};

export default Exercise;

