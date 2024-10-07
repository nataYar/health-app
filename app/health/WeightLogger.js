"use client";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userProvider";
import DatePickerContainer from "../../components/DatePickerContainer";
import { Stack, TextField, Button, Typography } from "@mui/material";
import PopupModal from "../../components/PopupModal";
import dayjs from "dayjs";
import { saveLogFieldFn } from "../utils/userFn";
import { Timestamp } from "firebase/firestore";


const WeightLogger = () => {
  const { myUser, currentDate } = useContext(UserContext);
  const [weightEntry, setWeightEntry] = useState({
    weight: null,
    date: null,
  });
  const [modalText, setModalText] = useState("Weight logged!"); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    if (selectedDate) {
      console.log(selectedDate.toDate())
      // Check if the selected date is in the future
      if (selectedDate.isAfter(currentDate, 'day')) {
        setModalText("Please select a date that is today or in the past.");
        setIsModalOpen(true)
        setSelectedDate(dayjs()); // Optionally reset to today's date
        return; // Exit the effect if the date is invalid
      }

      // Set weight entry date if the selected date is valid
      setWeightEntry((prevEntry) => ({
        ...prevEntry,
        date: selectedDate.toDate(),
      }));
   
    }
  }, [selectedDate, currentDate]); 

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleWeightChange = (event) => {
    const weightValue = parseFloat(event.target.value);
    setWeightEntry((prevEntry) => ({
      ...prevEntry,
      weight: weightValue,
    }));
  };

  const passWeightData = async () => {
    saveLogFieldFn(myUser.id, weightEntry.date, 'weight', weightEntry.weight) 
    setModalText("Weight logged!")
    setIsModalOpen(true);
    setSelectedDate(null)
    setWeightEntry({
      weight: "",
      date: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    weightEntry.weight !==  null  && weightEntry.date && myUser.id
      ? passWeightData()
      : 
      setModalText("Sign in or log date / weight");
      setIsModalOpen(true)
  };

  return (
    <Stack
      direction="column"
      alignItems="flex-start"
      height="auto"
      padding="20px"
      borderRadius="20px"
      backgroundColor="white"
      sx={{
        width: { xs: "90%", md: "35%" },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: "20px",
          textAlign: "center",
        }}
      >
        Log your weight here
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          height: "250px",
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <TextField
          type="number"
          label="Weight in lb"
          value={weightEntry.weight == null ? "" : weightEntry.weight}
          onChange={handleWeightChange}
          sx={{
            width: "100%",
          }}
        />

        <DatePickerContainer
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          widthMd="100%"
        />

        <Button 
        variant="contained" 
        type="submit"
        disabled={!weightEntry.date || !weightEntry.weight}
        >
          Log Weight
        </Button>
      </form>
      <PopupModal
        text={modalText}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Stack>
  );
};

export default WeightLogger;
