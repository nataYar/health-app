"use client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack } from "@mui/material";

import { exerciseOptions, fetchData } from "@/app/utils/exerciseData";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ exercises, bodyPart}) => {
  const [exercisesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredExercises, setFilteredExercises] = useState([]);


  useEffect(() => {
    const fetchExercisesData = async () => {
      if (bodyPart !== "all") {
        const searchedExercises = exercises.filter(
          (item) => item.bodyPart.toLowerCase().includes(bodyPart),
        );
        setFilteredExercises(searchedExercises);
      }  else {
        // Reset to original exercises when "all" is selected
        setFilteredExercises(exercises);
      }
      // Reset the page to the first one when the bodyPart changes
    setCurrentPage(1);
    };
    fetchExercisesData();
  }, [bodyPart, exercises]);

  //   Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

  const currentExercises = filteredExercises.slice(
    indexOfFirstExercise+1,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    
      filteredExercises.length > 0 && (
        <Box
        id="exercises"
        sx={{
          mt: { xs: "40px" },
          height: "100%",
          width: "100%",
        }}
        mt="40px"
        p="10px"
      >
        <Stack sx={{ mb: { xs: "50px" } }} alignItems="center">
          {exercises.length > 0 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(filteredExercises.length / exercisesPerPage)} 
            page={currentPage}
            onChange={paginate}
            size="large"
          />
          
          )}
        </Stack>
  
        <Stack
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            gap: "30px",
          }}
        >
  
          {currentExercises.map((exercise, idx) => (
            <ExerciseCard key={idx} exercise={exercise} />
          ))}
  
        </Stack>
  
        <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
          {exercises.length > 0 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(filteredExercises.length / exercisesPerPage)} 
            page={currentPage}
            onChange={paginate}
            size="large"
          />
          
          )}
        </Stack>
      </Box>
      )
  );
}

export default Exercises;
