'use client'

import { createContext, useState, useEffect } from 'react';
import { DataStore } from "@aws-amplify/datastore";
import { Exercise, Log } from "../models";
import { getUserFn } from '../utils/userFn'

// Create the user context
const UserContext = createContext();

// Create the UserContextProvider component
const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState({
    id: '', 
    nickname: '',
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
    // const storedUser = localStorage.getItem('myUser');

    // if (storedUser) {
    //   updateUser(JSON.parse(storedUser));
    // } 

    const startDataBase = async () =>{
     
      await DataStore.start();
    }
   startDataBase()
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('myUser', JSON.stringify(myUser));
  // }, [myUser]);

 useEffect(() => {
   console.log(myUser);
  }, [myUser]);

  // set the user as test User
  useEffect(() => {
    const getUser = async() => {
      const user = await getUserFn("n.yarysheva@gmail.com")
      updateUser({
        id: user.id, 
        nickname: user.nickname,
        email: user.email,
      })
      return user
    }
    getUser()
  }, [])

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
  useEffect(() => {
    if(myUser && myUser.id.length > 0) {
      const subscription = DataStore.observeQuery(Log, (p) =>
      p.userID.eq(myUser.id)
    ).subscribe((snapshot) => {
      const { items } = snapshot;

      // Convert the date strings to Date objects for correct sorting
      const sortedItems = items.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setUserLogs(sortedItems);
    });
    return () => subscription.unsubscribe();
    }
  }, [myUser]);

  // keep user Exercises updated
  useEffect(() => {
    if(myUser.id.length > 0) {
      const subscription = DataStore.observeQuery(Exercise, (p) =>
      p.userID.eq(myUser.id)
    ).subscribe((snapshot) => {
      const { items } = snapshot;

      // Convert the date strings to Date objects for correct sorting
      const sortedItems = items.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setUserExercises(sortedItems);
    });
    return () => subscription.unsubscribe();
    }
  }, [myUser]);

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
