"use client";
import { useContext, useState, useEffect } from "react";
import DonutChart from "./charts/DonutChart";
import { Box } from "@mui/material";
import LineChart from "./charts/LineChart";
import CaloryWidget from "./Widgets/CaloryWidget";
import WeightWidget from "./Widgets/WeightWidget";
import ExerciseWidget from "./Widgets/ExerciseWidget";
import { UserContext } from "../../context/userProvider";

export default function Dashboard() {
  const { userLogs, userExercises, currentCaloriesGoal, currentWeightGoal, currentDate } = useContext(UserContext);
  const [weightData, setWeightData] = useState({
    lastWeight: null,
    firstWeight: null,
  });

  const [exercisesDuration, setExercisesDuration] = useState({
    duration: null, 
    average: null,
    lastDate: null
  });

  const [caloriesToday, setCaloriesToday] = useState(0)

  useEffect(() => {
    const lastLoggedWeight = () => {
      console.log(userLogs)
      for (let i = userLogs.length - 1; i >= 0; i--) {
        const log = userLogs[i];
        if (log.weight !== undefined && log.weight !== null) {
          return log.weight;
        }
      }
      return null; 
      // Return null if all logs have null weights
    };
    let lastWeight = null; 
    if(userLogs.length > 0){
      lastWeight = lastLoggedWeight();
    }
    
    const firstLoggedWeight = userLogs.reduce((firstWeight, log) => {
      if (firstWeight === null && log.weight !== undefined && log.weight !== null) {
        return log.weight;
      }
      // Otherwise, keep the firstWeight unchanged
      return firstWeight;
    }, null);
   
    setWeightData({ lastWeight: lastWeight, firstWeight: firstLoggedWeight });



    // CALORIES consumed today
    // Function to format the date to 'YYYY-MM-DD'
    const formatDate = (date) => {
      return date.toISOString().split('T')[0]; // Extract 'YYYY-MM-DD' part from Date object
    };

    const logToday = userLogs.filter(log => {
      const logDate = log.date;
      return logDate === currentDate;
    });

    if (logToday.length > 0) {
      // Check if logToday array is not empty before accessing its properties
      setCaloriesToday(logToday[0].calories)
    } 

    //   // MINUTES
    if (userExercises.length > 0){
      const totalDuration = userExercises.reduce((acc, exercise) => acc + parseInt(exercise.duration), 0);
      const averageDuration = totalDuration / userExercises.length;

      const exToday = userExercises.filter(day => day.date === currentDate)
      if (exToday.length > 0) {
        // Check if logToday array is not empty before accessing its properties
        setExercisesDuration({duration: exToday[0].duration, average: averageDuration})
      } else  if((exToday.length == 0)){
        const lastLoggedEx = () => {
          for (let i = userExercises.length - 1; i >= 0; i--) {
            const log = userExercises[i];
            if (log.duration !== null) {
              return log;
            }
          }
        };
        const lastDur = lastLoggedEx();
        lastDur ? 
        setExercisesDuration({duration: lastDur.duration, average: averageDuration, lastDate: lastDur.date}) : null
      }
    }
  }, [userLogs] )


  return (
    <Box
      sx={{
        width: { sm: "100%" },
        color: "neutral.800",
        borderRadius: "20px",
        height:"auto",
        display: "flex",
        flexDirection: "column", // Add this to make the container flex column
        flexGrow: 1, // Allow the container to grow to take available space
        boxSizing: "border-box", 
      }}
    >
      <Box
        width="100%"
        height="auto"
        sx={{
          mt: "15px",
          gap: "10px",
          width: "auto",
          display: "flex",
          direction: { xs: "column", md: "row" },
          flexWrap: "wrap",
          alignItems: { xs: "start", md: "stretch" },
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          mb: "20px",
        }}
      >
        <CaloryWidget currentCaloriesGoal={currentCaloriesGoal} 
        caloriesToday={caloriesToday} currentDate={currentDate}
        />
        <ExerciseWidget exercisesDuration={exercisesDuration} currentDate={currentDate}/>
        <WeightWidget weightData={weightData} currentWeightGoal={currentWeightGoal } currentDate={currentDate} />
        
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ gap: "25px", width: "100%"}}
      >
        <DonutChart logs={userLogs} currentDate={currentDate} />
        <LineChart logs={userLogs} currentDate={currentDate}/>
      </Box>
    </Box>
  );
}
