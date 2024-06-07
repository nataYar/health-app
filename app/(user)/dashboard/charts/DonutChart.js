"use client";
import { useEffect, useState } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { extraColors } from "../../../theme/colors";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import dayjs from "dayjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ logs, currentDate }) => {
  const [nutrients, setNutrients] = useState({
    carbs: null,
    fals: null,
    protein: null,
  });
  const [displayedDate, setDate] = useState("");
  const [intro, setIntro] = useState("");
  const theme = useTheme();
  let nutrientsArray;

  useEffect(() => {
    if (logs) {
      nutrientsArray = logs
        .map((log) => {
          // Only include the date is before or equal to the current date
          const logDate = dayjs(log.date);
          if (
            logDate.isBefore(currentDate) ||
            logDate.isSame(currentDate, "day")
          ) {
            return log;
          }
          return null;
        })
        .filter((log) => log !== null);
      if (nutrientsArray.length > 0) {
        for (let i = nutrientsArray.length - 1; i >= 0; i--) {
          const logEntry = nutrientsArray[i];
          if (
            logEntry.carbs !== null ||
            logEntry.fats !== null ||
            logEntry.protein !== null
          ) {
            setNutrients({
              carbs: logEntry.carbs,
              fats: logEntry.fats,
              protein: logEntry.protein,
            });
            setIntro("last log");
            setDate(dayjs(logEntry.date).format("MMMM D"));
            break;
          }
        }
      } else if (nutrientsArray.length == 0) {
        setNutrients({
          carbs: 0,
          fats: 0,
          protein: 0,
        });
      }
    }
  }, [logs]);

  const data = {
    labels: ["Carbs", "Protein", "Fat"],
    datasets: [
      {
        data: [nutrients.carbs, nutrients.protein, nutrients.fats],
        backgroundColor: [
          extraColors.orange,
          extraColors.green,
          theme.palette.primary.main,
        ],
        hoverBackgroundColor: [
          extraColors.orange,
          extraColors.green,
          theme.palette.primary.main,
        ],
      },
    ],
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        width: {
          xs: "100%",
          sm: "48%",
          md: "350px",
        },
        height: {
          xs: "auto",
          sm: "550px",
        },
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <Typography variant="h5">Nutrients</Typography>
      <Typography
        variant="subtitle2"
        textAlign="left"
        sx={{
          mb: "16px",
          color: theme.palette.neutral[400],
          fontWeight: "normal",
          fontSize: "14px",
        }}
      >
        {intro} - {displayedDate}
      </Typography>

      <Doughnut data={data} width={"100%"} height={"100%"} />
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-evenly"
        marginTop="20px"
        alignItems="flex-start"
      >
        <Typography variant="h5" textAlign="left">
          <span
            style={{
              color: theme.palette.neutral[400],
              fontWeight: "normal",
              fontSize: "12px",
            }}
          >
            carbs:{" "}
          </span>
          <br />
          {nutrients.carbs}
        </Typography>
        <Typography variant="h5" textAlign="left">
          <span
            style={{
              color: theme.palette.neutral[400],
              fontWeight: "normal",
              fontSize: "12px",
            }}
          >
            protein:{" "}
          </span>
          <br />
          {nutrients.protein}
        </Typography>
        <Typography variant="h5" textAlign="left">
          <span
            style={{
              color: theme.palette.neutral[400],
              fontWeight: "normal",
              fontSize: "12px",
            }}
          >
            fat:{" "}
          </span>
          <br />
          {nutrients.fats}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default DonutChart;
