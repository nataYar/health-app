"use client";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "@/app/utils/exerciseData";
import ExerciseCard from "./ExerciseCard";
// import Loader from './Loader';


const Exercises = ({ exercises, setExercises, bodyPart}) => {
  const [exercisesPerPage] = useState(9);
  
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {console.log(exercises)}, [exercises])
  
  useEffect(() => {
    const renderExercises = () => {
      const newExercises = [];
      const exerciseCount = 600;
      for (let i = 0; i < exerciseCount; i++) {
        newExercises.push({ text: `jhbj ${i}`, id: i, like: false  });
      }
      setExercises(newExercises);
    };

    renderExercises();
  }, []);



    useEffect(() => {
      const fetchExercisesData = async () => {
        let exercisesData = [];

        if (bodyPart === "all") {
          exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises",
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
            exerciseOptions
          );
        }

        setExercises(exercisesData);
      };

      fetchExercisesData();
    }, [bodyPart]);

  //   Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

    if (!currentExercises.length) return <div>loading...</div>;

  return (
    <Box
      id="exercises"
      sx={{
        mt: { xs: "40px", lg: "50px" },
        height: "100%",
        width: "100%",
      }}
      mt="50px"
      p="10px"
    >
      <Stack
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}

        {currentExercises.map((exercise, ind) => (
          <div style={{ width: "100px", height: "50px" }} key={ind} >{exercise.text}</div>
        ))}

      </Stack>

      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 0 && (
        <Pagination
          color="standard"
          shape="rounded"
          defaultPage={1}
          count={Math.ceil(exercises.length / exercisesPerPage)}
          page={currentPage}
          onChange={paginate}
          size="large"
        />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
