import { db } from "../firebase";
import { doc, collection, getDocs, setDoc, Timestamp, onSnapshot  } from "firebase/firestore"; 
import Exercises from '../fitness/exercises/Exercises';
import dayjs from "dayjs";

// export const createUserFn = async (nickname, email) => {
//   try {
//     console.log(nickname, email)
//     const newUser = await client.graphql({
//       query: createUser,
//       variables: {
//           input: {
//       "nickname": nickname,
//       "email": email,
//     }
//       }
//   });
//     console.log(newUser);
//     const res = {
//       email: newUser.data.createUser.email,
//       id: newUser.data.createUser.id,
//       nickname: newUser.data.createUser.nickname
//     }
//     console.log(res)
//     return res;

//   } catch (error) {
//     console.log("Error creating new user:", error);
//   }
// };


// export const getUserByEmailFn = async (email) => {
//   try {
//     console.log(email);
//     const result = await API.graphql(graphqlOperation(getUserFn, { email }));
//     console.log(result.data.getUserFn);
//     return result.data.getUserFn;
//   } catch (error) {
//     console.log("Error fetching user by email:", error);
//   }
// };


// export const createUserFn = async (nickname, email) => {
//   try {
//     const user = await DataStore.save(
//       new User({
//         nickname: nickname,
//         email: email,
//         Logs: [],
//       })
//     );
//     console.log(user)
//     return user;
//   } catch (error) {
//     console.log("Error saving new user:", error);
//   }
// };

export const getUserByEmail = async (email) => {
  try {
    // Get a specific item
    console.log("from getUserByEmail")
    // const oneUser = await client.graphql({
    //   query: getUser,
    //   variables: { email: email }
    // });
    // console.log(email)
    // console.log(oneUser.data.getUser)
    // return oneUser.data.getUser;
  } catch (error) {
    console.log("Error fetching user by email:", error);
  }
};

// export const getUserFn = async (email) => {
//   try {
//     console.log(email)
//     const user = await DataStore.query(User, (p) => p.email.eq(email));
    
//     console.log(user[0])
//     return user[0];
//   } catch (error) {
//     console.log("Error saving new user:", error);
//     console.log(error);
//   }
// };
export const saveLogFieldFn = async (userId, date, field, value) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const logsRef = collection(userDocRef, "Logs");
    
    // Query to check if a log with the same date already exists
    const logsSnapshot = await getDocs(logsRef);
    let logIdToUpdate = null;
    
    // Convert the Firestore Timestamp to a JavaScript Date
    const inputDate = date
    // console.log(inputDate)
    inputDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison

    logsSnapshot.forEach((doc) => {
      const logData = doc.data();
      const logDate = logData.date.toDate(); // Assuming date is stored as a Firestore Timestamp
      logDate.setHours(0, 0, 0, 0); // Set time to midnight for comparison
      // console.log(logDate.setHours(0, 0, 0, 0))

      // Check if the log date matches the input date
      if (logDate.getTime() === inputDate.getTime()) {
        logIdToUpdate = doc.id; // Store the ID of the log to update
      }
    });

    if (logIdToUpdate) {
      // Log entry exists; update the specific field
      const logDocRef = doc(logsRef, logIdToUpdate);
      await setDoc(logDocRef, { [field]: value }, { merge: true });
      console.log(`Updated field ${field} in log ${logIdToUpdate}`);
    } else {
      // Log entry doesn't exist; create a new one
      const newLogRef = doc(logsRef); // Create a new log reference
      const newLogData = {
        date: date, // Save the date as a Timestamp
        [field]: value,
      };
      await setDoc(newLogRef, newLogData);
      console.log(`Created new log for date ${date}`);
    }
  } catch (error) {
    console.error("Error saving/updating log field:", error);
  }
};


// export const saveLogFn = async (
//   userId,
//   date,
//   caloriesVal,
//   proteinVal,
//   fatsVal,
//   carbsVal
// ) => {
//   try {
   
//     const logsByDate = await DataStore.query(Log, (log) => log.date.eq(date));
//     // check if the Log exists
//     const logByUser = logsByDate.filter((log) => log.userID === userId);

//     if (logByUser.length > 0) {
//        await DataStore.save(Log.copyOf(logByUser[0], (updated) => {
//         // check if the values are provided and are different from the current values
//         if (caloriesVal !== undefined && updated.calories !== caloriesVal) {
//           updated.calories = updated.calories + caloriesVal;
//         }
//         if (proteinVal !== undefined ) {
//           updated.protein =  updated.protein + proteinVal;
//         }
//         if (fatsVal !== undefined) {
//           updated.fats =  updated.fats + fatsVal;
//         }
//         if (carbsVal !== undefined ) {
//           updated.carbs =  updated.carbs +carbsVal;
//         }
//       }));
//     } else {
//       // if doesn't exist, create the Log
//       await DataStore.save(
//         new Log({
//           date: date,
//           userID: userId,
//           calories: caloriesVal,
//           protein: proteinVal,
//           fats: fatsVal,
//           carbs: carbsVal,
//         })
//       );
//     }
//   } catch (error) {
//     console.log("Error saving new user:", error);
//     console.log(error);
//   }
// };

// export const saveExerciseFn = async (userId, exercise, duration, date) => {
//   try {
//     await DataStore.save(
//       new Exercise({
//         date: date,
//         userID: userId,
//         duration: duration,
//         exercise: exercise,
//       })
//     );
//   } catch (error) {
//     console.log("Error saving new user:", error);
//     console.log(error);
//   }
// };

// export const getLogFn = async (userId) => {
//   const logsByUser = await DataStore.query(Log, (log) => log.userID.eq(userId));
//   console.log(logsByUser)
//   return logsByUser;
// };

// export const getExerciseFn = async (userId) => {
//   const exerciseByUser = await DataStore.query(Exercise, (el) =>
//     el.userID.eq(userId)
//   );
//   return exerciseByUser;
// };

// export const deleteExerciseFn = async (logID) => {
//   const modelToDelete = await DataStore.query(Exercise, logID);
//   DataStore.delete(modelToDelete);
// };

export const saveGoal = async (userId, caloriesGoal, weightGoal, date) => {
  try {
    console.log(userId, caloriesGoal, weightGoal, date)
//     const logs = await DataStore.query(Log, (log) => log.userID.eq(userId));
//     console.log(logs)
//     const lastLog = logs[logs.length - 1];

//     if (logs.length > 0) {
//       // if exists, update the field
//       await DataStore.save(
//         Log.copyOf(lastLog, (updated) => {
//           updated.caloriesGoal = caloriesGoal;
//           updated.weightGoal = weightGoal;
//           updated.date= date
//         })
//       );
//     } else {
//       // if doesn't exist, create the Log
//       await DataStore.save(
//         new Log({
//           caloriesGoal: caloriesGoal,
//           weightGoal: weightGoal,
//           userID: userId,
//           date: date,
//         })
//       );
//     }
  } catch (error) {
    console.log("Error saving new user:", error);
    console.log(error);
  }
};
