"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import HorizontalBar from "./HorizontalBar";
import { exerciseOptions, fetchData } from "@/app/utils/exerciseData";
import { Box } from "@mui/material";
import Exercises from "./Exercises";

const Exercise = () => {
  const [bodyParts, setBodyParts] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([])
  const router = useRouter();  // Get access to the router

  useEffect(() => {
    if (router.pathname === '/fitness/exercises') {
      const fetchExercisesData = async () => {
        const url = 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList';

        const bodyPartsData = await fetchData(url, exerciseOptions);
        
        console.log(bodyPartsData);

        if (bodyPartsData.length > 0) {
          setBodyParts(['all', ...bodyPartsData]);
        }
      };
      fetchExercisesData();
    }
  }, []);

const changeBodyPart = (el) => {
  setBodyPart(el)
}

useEffect(()=>{
  console.log("bodyParts" + bodyParts)
}, [bodyParts])

  return (
        <Box sx={{ width: "100%" }}>
          <HorizontalBar
            data={bodyParts}
            bodyPart={bodyPart}
            bodyParts={bodyParts}
            handleBodyPartChange={changeBodyPart}
          /> 
          {/* 
          <Exercises bodyPart={bodyPart} exercises={exercises} setExercises={setExercises}/> */}
        
        </Box>


  );
};

export default Exercise;

