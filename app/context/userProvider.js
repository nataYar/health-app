'use client'
import { createContext, useState, useEffect } from 'react';
// import { DataStore } from "@aws-amplify/datastore";
// import { getUserByEmail  } from '../utils/userFn'

// import { listExercises } from '../graphql/queries';
// import { onCreateExercise, onUpdateExercise, onDeleteExercise } from '../graphql/subscriptions';

// Create the user context
const UserContext = createContext();

// Create the UserContextProvider component
const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({
    id: '', 
    email: '',
    Logs: [],
  });
  const [userLogs, setUserLogs] = useState([])
  const [userExercises, setUserExercises] = useState([])
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  const [currentCaloriesGoal, setCurrentCaloriesGoal] = useState(null);
  const [currentWeightGoal, selCurrentWeightGoal] = useState(null);

 useEffect(() => {
   console.log(myUser);
  }, [myUser]);

  // set the user as test User
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       // const user = await getUserByEmail("n.yarysheva@gmail.com");
  //       console.log(user)
  //       updateUser({
  //         id: user.id, 
  //         nickname: user.nickname,
  //         email: user.email,
  //       });
  //       return user;
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    const lastLoggedWeightGoal = () => {
      for (let i = userLogs.length - 1; i >= 0; i--) {
        const log = userLogs[i];
        if (log.weightGoal !== null) {
          return log.weightGoal;
        }
      }
      return null; // Return null if all logs have null weights
    };
    const lastW = lastLoggedWeightGoal();
    lastW ? selCurrentWeightGoal(lastW) : null;
  }, [userLogs]);

  useEffect(() => {
    const lastLoggedCaloriesGoal = () => {
      for (let i = userLogs.length - 1; i >= 0; i--) {
        const log = userLogs[i];
        if (log.caloriesGoal !== null) {
          return log.caloriesGoal;
        }
      }
      return null; // Return null if all logs have null weights
    };
    const lastC = lastLoggedCaloriesGoal();
    lastC ? setCurrentCaloriesGoal(lastC) : null;
  }, [userLogs]);

  // keep Logs updated
  // useEffect(() => {
  //   if(myUser && myUser.id.length > 0) {
  //     const subscription = DataStore.observeQuery(Log, (p) =>
  //     p.userID.eq(myUser.id)
  //   ).subscribe((snapshot) => {
  //     const { items } = snapshot;

  //     // Convert the date strings to Date objects for correct sorting
  //     const sortedItems = items.sort(
  //       (a, b) => new Date(a.date) - new Date(b.date)
  //     );
  //     setUserLogs(sortedItems);
  //   });
  //   return () => subscription.unsubscribe();
  //   }
  // }, [myUser]);


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
    currentCaloriesGoal
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
