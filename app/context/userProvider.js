'use client'
import { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot, doc, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import dayjs from 'dayjs';
const UserContext = createContext();
// import { getUserByEmail  } from '../utils/userFn'

// import { onCreateExercise, onUpdateExercise, onDeleteExercise } from '../graphql/subscriptions';

// Create the user context


// Create the UserContextProvider component
const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({
    id: '', 
    email: '',
    nickname: '',
    Logs: [],
  });
  const [userLogs, setUserLogs] = useState([])
  const [userExercises, setUserExercises] = useState([])
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [currentCaloriesGoal, setCurrentCaloriesGoal] = useState(null);
  const [currentWeightGoal, selCurrentWeightGoal] = useState(null);
  const currentDate = dayjs().toDate();

//  useEffect(() => {
//   console.log("User");
//    console.log(myUser);
//   }, [myUser]);

  

//    useEffect(() => {
//     console.log("Exercises");
//     console.log(userExercises);
//    }, [userExercises]);


  //  Populate Logs and Exercises
   useEffect(() => {
    if (!myUser.id) return; // Return if there's no user
    const userDocRef = doc(db, "users", myUser.id);
    const logsRef = collection(userDocRef, "Logs");

    // Set up the real-time listener for the Logs subcollection
    const unsubscribe = onSnapshot(logsRef, async (querySnapshot) => {
      const logsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Sort logs by date using dayjs
      const sortedLogsArray = logsArray.sort((a, b) => 
        dayjs(a.date.toDate()).isBefore(dayjs(b.date.toDate())) ? -1 : 1
      );

      setUserLogs(sortedLogsArray); // Update the state with the latest logs
  
      if (logsArray.length === 0) {
        console.log("No logs found for this user.");
        return; // Exit early if no logs
      }
  
      const allExercises = []; 
  
      // Fetch exercises for each log
      for (const log of logsArray) {
        const exercisesRef = collection(userDocRef, `Logs/${log.id}/Exercises`);
        const exercisesSnapshot = await getDocs(exercisesRef); 
        
        if (exercisesSnapshot.empty) {
          console.log(`No exercises found for log ${log.id}.`);
          continue; // Skip to the next log if no exercises
        }
  
        //each doc in Exercises may contain many Exercises
        exercisesSnapshot.forEach((doc) => {
          allExercises.push({
            id: doc.id,
            ...doc.data(),
            logId: log.id, // Reference back to the log it belongs to
          });
        });
      }
  
      setUserExercises(allExercises);
    }, (error) => {
      console.error("Error fetching logs:", error);
    });
  
    // clean up the listener when the user changes
    return () => {
      unsubscribe();
    };
  }, [myUser]);
  

  useEffect(() => {
    const lastLoggedWeightGoal = () => {
      for (let i = userLogs.length - 1; i >= 0; i--) {
        const log = userLogs[i];
        // Check if weightGoal exists
        if (log.weightGoal !== null && log.weightGoal !== undefined) {
          return log.weightGoal;
        }
      }
      return null;  // Return null if no weightGoal is found
    };
  
    const lastW = lastLoggedWeightGoal();
    if (lastW !== null) {
      selCurrentWeightGoal(lastW);
    }
  }, [userLogs]);

  useEffect(() => {
    const lastLoggedCaloriesGoal = () => {
      for (let i = userLogs.length - 1; i >= 0; i--) {
        const log = userLogs[i];
        // Check if caloriesGoal exists
        if (log.caloriesGoal !== null && log.caloriesGoal !== undefined) {
          return log.caloriesGoal;
        }
      }
      return null;  // Return null if no caloriesGoal is found
    };
  
    const lastC = lastLoggedCaloriesGoal();
    if (lastC !== null) {
      setCurrentCaloriesGoal(lastC);
    }
  }, [userLogs]);
  
  // useEffect(() => {
  //   const lastLoggedCaloriesGoal = () => {
  //     for (let i = userLogs.length - 1; i >= 0; i--) {
  //       const log = userLogs[i];
  //       console.log(userLogs[i])
  //       if (log.caloriesGoal !== null) {
  //         return log.caloriesGoal;
  //       }
  //     }
  //     return null; // Return null if all logs have null weights
  //   };
  //   const lastC = lastLoggedCaloriesGoal();
  //   lastC ? setCurrentCaloriesGoal(lastC) : null;
  // }, [userLogs]);


  // keep user Exercises updated
  // useEffect(() => {
  //   if (myUser.id.length > 0) {
  //     // Function to fetch initial data
  //     const fetchExercises = async () => {
  //       try {
  //         const result = await API.graphql(graphqlOperation(listExercises, {
  //           filter: { userID: { eq: myUser.id } }
  //         }));
  //         const items = result.data.listExercises.items;
  
  //         // Convert the date strings to Date objects for correct sorting
  //         const sortedItems = items.sort((a, b) => new Date(a.date) - new Date(b.date));
  //         setUserExercises(sortedItems);
  //       } catch (error) {
  //         console.error('Error fetching exercises:', error);
  //       }
  //     };
  
  //     fetchExercises();
  
  //     // Subscriptions to listen for real-time updates
  //     const createSubscription = API.graphql(
  //       graphqlOperation(onCreateExercise, { userID: myUser.id })
  //     ).subscribe({
  //       next: ({ value }) => {
  //         const newExercise = value.data.onCreateExercise;
  //         setUserExercises(prevExercises => [...prevExercises, newExercise].sort((a, b) => new Date(a.date) - new Date(b.date)));
  //       }
  //     });
  
  //     const updateSubscription = API.graphql(
  //       graphqlOperation(onUpdateExercise, { userID: myUser.id })
  //     ).subscribe({
  //       next: ({ value }) => {
  //         const updatedExercise = value.data.onUpdateExercise;
  //         setUserExercises(prevExercises => {
  //           const updatedExercises = prevExercises.map(exercise => exercise.id === updatedExercise.id ? updatedExercise : exercise);
  //           return updatedExercises.sort((a, b) => new Date(a.date) - new Date(b.date));
  //         });
  //       }
  //     });
  
  //     const deleteSubscription = API.graphql(
  //       graphqlOperation(onDeleteExercise, { userID: myUser.id })
  //     ).subscribe({
  //       next: ({ value }) => {
  //         const deletedExercise = value.data.onDeleteExercise;
  //         setUserExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== deletedExercise.id));
  //       }
  //     });
  
  //     // Cleanup subscriptions on unmount
  //     return () => {
  //       createSubscription.unsubscribe();
  //       updateSubscription.unsubscribe();
  //       deleteSubscription.unsubscribe();
  //     };
  //   }
  // }, [myUser]);

  // useEffect(() => {
  //   if(myUser.id.length > 0) {
  //     const subscription = DataStore.observeQuery(Exercise, (p) =>
  //     p.userID.eq(myUser.id)
  //   ).subscribe((snapshot) => {
  //     const { items } = snapshot;

  //     // Convert the date strings to Date objects for correct sorting
  //     const sortedItems = items.sort(
  //       (a, b) => new Date(a.date) - new Date(b.date)
  //     );
  //     setUserExercises(sortedItems);
  //   });
  //   return () => subscription.unsubscribe();
  //   }
  // }, [myUser]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    // Check if window is defined (to avoid errors during server-side rendering)
    if (typeof window !== 'undefined') {
        setScreenWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
      }
  
      // Clean up the event listener on component unmount
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
      };
  }, [])

  // Example function to update the user
  const updateUser = (newUser) => {
    setMyUser(newUser);
  };

  // Value object that will be provided to consuming components
  const contextValue = {
    myUser,
    updateUser,
    screenWidth,
    userLogs,
    userExercises,
    currentWeightGoal,
    currentCaloriesGoal,
    currentDate
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
