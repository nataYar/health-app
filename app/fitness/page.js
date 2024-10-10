"use client"

import { useState, useContext  } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DataPickerContainer from "../../components/DatePickerContainer";
import FitnessLogContainer from "./FitnessLogContainer";
import { exercisesData } from "./exercisesData";
import { saveExerciseFn } from "../utils/userFn";
import { UserContext } from "../context/userProvider";
import PopupModal from "../../components/PopupModal.js";
import dayjs from "dayjs";

const LogExercise = () => {
  const { myUser, userExercises} = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [exercise, setExercise] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [duration, setDuration] = useState("");
  const [modalText, setModalText] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleLogExercise = () => {
    if(myUser.id && (exercise || customExercise)  && duration && selectedDate ){
      const ex = exercise !== "Custom" ? exercise : customExercise;
      saveExerciseFn(myUser.id, ex, duration, selectedDate.format("YYYY-MM-DD"));
      clearInput(); // Clear input fields
    } else if (!myUser.id && (exercise || customExercise) && duration && selectedDate ) {
      setModalText("Please sign-in")
      setIsModalOpen(true)
    } 
    
  };

  const clearInput = () => {
    setSelectedDate(dayjs());
    setCustomExercise("");
    setExercise("");
    setDuration("");
  };

  const handleExerciseChange = (event) => {
    const value = event.target.value;
    setExercise(value);
  };

  const handleCustomExerciseChange = (event) => {
    setCustomExercise(event.target.value);
  };

  const handleDurationChange = (event) => {
    // Get the input value as a string
    const valueAsString = event.target.value;
    // Use parseInt to convert the string to a number
    const valueAsNumber = parseInt(valueAsString, 10);
    // Set the duration to the parsed number
    setDuration(valueAsNumber);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          width: {xs: '100%', sm:"70%"},
          mb: "15px",
          mx: "auto",
          p: "32px 24px",
          color: "neutral.800",
          borderRadius: "20px",
          overflow:"visible"
        }}
      >
        <Typography variant="h5" gutterBottom>
          Log Exercise
        </Typography>

        <Box
          sx={{
            mt: "15px",
            gap: "15px",
            width: "auto",
            display: "flex",
            direction: { xs: "column", md: "row" },
            flexWrap: "wrap",
            alignItems: { xs: "center" },
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <FormControl
            sx={{ width: { xs: "100%", md: "200px" }, borderRadius: "20px" }}
          >
            <InputLabel id="exercise-label" sx={{ pt: "10px" }}>
              Exercise
            </InputLabel>
            <Select
              sx={{ borderRadius: "20px", p: "10px" }}
              labelId="exercise-label"
              value={exercise}
              onChange={handleExerciseChange}
            >
              {exercisesData.map((exerciseOption) => (
                <MenuItem key={exerciseOption} value={exerciseOption}>
                  {exerciseOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {exercise === "Custom" ? (
            <TextField
              label="Add custom exercise"
              value={customExercise}
              onChange={handleCustomExerciseChange}
              sx={{ width: { xs: "100%", md: "200px" } }}
            />
          ) : null}

          <TextField
            type="number"
            label="Duration in min"
            value={duration}
            slotProps={{
              input: {
                inputMode: "numeric", // Set input mode to numeric
                pattern: "[0-9]*", // Only allow numeric input
                step: "1", // Only allow integer values
              },
            }}
            onChange={handleDurationChange}
            autoComplete="false"
            sx={{
              width: { xs: "100%", md: "150px" },
              mx: { xs: "0px", md: "25px" },
            }}
          />
          <DataPickerContainer
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            widthMd="160px"
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogExercise}
          disabled={!selectedDate || !exercise || !duration}
          sx={{ width: "100px", height: "auto", mt: "15px" }}
        >
          Add
        </Button>
      </Box>

      <Box
        component={Paper}
        sx={{
          width: {xs: '100%', sm:"70%"},
          mb: "15px",
          mx: "auto",
          p: "32px 24px",
          color: "neutral.800",
          borderRadius: "20px",
        }}
      >
        <FitnessLogContainer
          exercises={userExercises}
        />
      </Box>
      <PopupModal
          text={modalText}
          open={isModalOpen}
          onClose={handleCloseModal}
        />
    </>
  );
};

export default LogExercise;
