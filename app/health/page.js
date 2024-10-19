'use client'

import { useEffect, useContext, useState } from "react";
import { UserContext } from "../context/userProvider";

import WeightLogger from './WeightLogger';
import { Box, Stack, Typography, List, ListItem, ListItemText } from "@mui/material";
import dayjs from "dayjs";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // Make sure to import your Fir

const Health = () => {
  const { myUser } = useContext(UserContext);
  const [weightLogs, setWeightLogs] = useState([]);

  useEffect(() => {
    if (!myUser.id) return;

    const userDocRef = doc(db, "users", myUser.id);
    const logsRef = collection(userDocRef, "Logs");
    
    const unsubscribe = onSnapshot(logsRef, async (querySnapshot) => {
      const weightArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort logs by date
      const sortedArray = weightArray.sort((a, b) => 
        dayjs(a.date).isBefore(dayjs(b.date)) ? 1 : -1
      );

      setWeightLogs(sortedArray); 
      // Update the state with the latest logs

      if (weightArray.length === 0) {
        console.log("No logs found for this user.");
        return; // Exit early if no logs
      }
    }, (error) => {
      console.error("Error fetching logs:", error);
    });

    return () => unsubscribe();
  }, [myUser, weightLogs]);


  // useEffect(() => {console.log(weightLogs)}, [weightLogs])

  return (
    <>
    <Box sx={{
      width: '100%', 
     display: "flex",
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: {xs: 'center', md: 'flex-start'},
    }}>
      <WeightLogger />
    </Box>
    
    {/* All weight logs */}
    <Stack
      direction="column"
      alignItems="flex-start"
      height="auto"
      marginTop="20px"
      padding="20px"
      borderRadius="20px"
      backgroundColor="white"
      sx={{
        width: { xs: "100%", md: "35%" },
        
      }}
    >
      <Typography variant="h5" sx={{ 
        mb: "20px", 
        textAlign: "center" 
        }}>
        Weight Logs
      </Typography>
      <List>
        {weightLogs.map((log) => (
          <ListItem key={log.id}>
            <ListItemText
              primary={`Weight: ${log.weight} lbs`}
              secondary={`Date: ${log.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
    </>
  )
}

export default Health