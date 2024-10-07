"use client";
import { useState, useEffect } from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x axis
  LinearScale, // y axis
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale, 
  PointElement
);

const LineChart = ({ logs, currentDate }) => {
  const [maxWeight, setMaxWeight] = useState(null);
  const [minWeight, setMinWeight] = useState(null);
  const theme = useTheme();
  const [labelArray, setLabelArray] = useState([]); // Move labelArray to state
  const [weightArray, setWeightArray] = useState([]); 

  useEffect(() => {
    if (logs.length > 0) {
      // Map over logs to create label array for dates
      const labels = logs
        .map((log) => {
          // Convert Firestore Timestamp to JavaScript Date object
          const logDate = dayjs(log.date.toDate());
          if (logDate.isBefore(currentDate) || logDate.isSame(currentDate, 'day')) {
            return logDate.format('MMMM D');
          }
          return null;
        })
        .filter((date) => date !== null);

      // Map over logs to create weight array for weights
      const weights = logs
        .map((log) => {
          return log.weight;
        })
        .filter((num) => typeof num === 'number'); // Filter out invalid weights

      if (weights.length > 0) {
        setMinWeight(Math.min(...weights)); // Set minimum weight
        setMaxWeight(Math.max(...weights)); // Set maximum weight
      }

      // Update the state with labels and weights
      setLabelArray(labels);
      setWeightArray(weights);
    }
  }, [logs]);

  const weightData = {
    labels: labelArray, //feed it data
    datasets: [
      {
        label: "Weight",
        tension: 0.4,
        backgroundColor: "transparent",
        borderColor: theme.palette.primary.main,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHitRadius: 10,
        data: weightArray, //feed it data
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        width: {
          xs: "100%",
          sm: "48%",
          md: "500px",
          lg: "500px",
        },
        height: {
          xs: "auto",
          md: "400px",
        },
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "20px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: "20px",
        }}
      >
        Weight
      </Typography>
      <Line
        options={options}
        redraw={true}
        data={weightData}
        width={"auto"}
        height={"165px"}
      />

      <Typography variant="h5" sx={{ mt: "20px" }}>
        <span
          style={{
            color: theme.palette.neutral[400],
            fontWeight: "normal",
            fontSize: "12px",
          }}
        >
          max:{" "}
        </span>
        {maxWeight ? maxWeight : "-" }
        <span
          style={{
            color: theme.palette.neutral[400],
            marginLeft: "10px",
            fontWeight: "normal",
            fontSize: "12px",
          }}
        >
          min:{" "}
        </span>
        {minWeight ? minWeight : "-" }
      </Typography>
    </Stack>
  );
};
export default LineChart;
