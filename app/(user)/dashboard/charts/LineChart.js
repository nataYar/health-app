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
  let labelArray ;
  let weightArray;

  // useEffect(() =>{
  //   console.log(minWeight)
  // }, [minWeight])

  useEffect(() => {
    if(logs){
      // Create an array to store weight values
      labelArray = logs
      .map((log) => {
        // Only include the date if a weight is logged and the date is before or equal to the current date
        const logDate = dayjs(log.date);
        if (logDate.isBefore(currentDate) || logDate.isSame(currentDate, 'day')) {
          return logDate.format('MMMM D');
        }
        return null; 
      })
      .filter((date) => date !== null); 
      weightArray = logs.map((log) => log.weight).filter((num) => typeof num === 'number');
     
      if(weightArray.length >0){
        setMinWeight(Math.min(...weightArray))
        setMaxWeight(Math.max(...weightArray))
      }
      
    }
  }, [logs])

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
