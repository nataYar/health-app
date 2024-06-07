"use client";

import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userProvider";
import DatePickerContainer from "../../components/DatePickerContainer";
import { Stack, TextField, Button, Typography } from "@mui/material";
import PopupModal from "../../components/PopupModal";
import dayjs from "dayjs";
import { saveLogFieldFn } from "../utils/userFn";


const WeightLogger = () => {
  const { myUser } = useContext(UserContext);
  const [weightEntry, setWeightEntry] = useState({
    weight: null,
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    selectedDate
      ? setWeightEntry((prevEntry) => ({
          ...prevEntry,
          date: selectedDate.format("YYYY-MM-DD"),
        }))
      : null;
  }, [selectedDate]);

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
    setIsModalOpen(true);
    setSelectedDate(null)
    setWeightEntry({
      weight: "",
      date: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    weightEntry.weight !==  null  && weightEntry.date
      ? passWeightData()
      : alert("Please log weight and date");
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
        Weight Logger
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
        text="Weight logged!"
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Stack>
  );
};

export default WeightLogger;
