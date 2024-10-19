import { db } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  Timestamp,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Exercises from "../fitness/exercises/Exercises";
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
    console.log("from getUserByEmail");
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
    console.log(date);
    const userDocRef = doc(db, "users", userId);
    const logsRef = collection(userDocRef, "Logs");

    // Query to check if a log with the same date already exists
    const logsSnapshot = await getDocs(logsRef);
    let logIdToUpdate = null;

    // Convert the Firestore Timestamp to a JavaScript Date
    const inputDate = Timestamp.fromDate(new Date(date));
    console.log(inputDate);

    logsSnapshot.forEach((doc) => {
      const logData = doc.data();
      const logDate = logData.date;
      console.log(logDate);
      // Check if the log date matches the input date
      if (logDate === inputDate) {
        logIdToUpdate = doc.id; // Store the ID of the log to update
      }
    });

    if (logIdToUpdate) {
      // Log entry exists; update the specific field
      const logDocRef = doc(logsRef, logIdToUpdate);
      await setDoc(
        logDocRef,
        {
          [field]: value,
          id: logDocRef.id,
        },
        { merge: true }
      );
      console.log(`Updated field ${field} in log ${logIdToUpdate}`);
    } else {
      // Log entry doesn't exist; create a new one
      const newLogRef = doc(logsRef); // Create a new log reference
      const newLogData = {
        date: date, // Save the date as a Timestamp
        [field]: value,
        id: newLogRef.id,
      };
      await setDoc(newLogRef, newLogData);
      console.log(`Created new log for date ${date}`);
    }
  } catch (error) {
    console.error("Error saving/updating log field:", error);
  }
};

export const saveLogFn = async (
  userId,
  date,
  caloriesVal,
  proteinVal,
  fatsVal,
  carbsVal
) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const logsRef = collection(userDocRef, "Logs");

    // Query to check if a log with the same date already exists
    const logsSnapshot = await getDocs(logsRef);
    let logIdToUpdate = null;

    // Convert the Firestore Timestamp to a JavaScript Date
    // Convert the input date to a Firestore Timestamp
    //  const inputDate = Timestamp.fromDate(new Date(date)); // Convert to Firestore Timestamp
    console.log(date);
    const inputDate = Timestamp.fromDate(new Date(date));
    console.log(inputDate);

    logsSnapshot.forEach((doc) => {
      const logData = doc.data();
      // const logDate = logData.date.toDate(); // Assuming date is stored as a Firestore Timestamp
      const logDate = logData.date;
      console.log(logDate);
      // Check if the log date matches the input date
      // if (logDate.getTime() === inputDate.toDate().getTime()) {
      //   logIdToUpdate = doc.id; // Store the ID of the log to update
      // }
    });
    //   if (logIdToUpdate) {
    //     // Log entry exists; update the specific field
    //     const logDocRef = doc(logsRef, logIdToUpdate);
    //     await setDoc(logDocRef, {
    //       id: logDocRef.id,
    //       calories: (logData.calories || 0) + caloriesVal,
    //       protein:  (logData.protein || 0) + proteinVal,
    //       fats:  (logData.fats || 0) + fatsVal,
    //       carbs:  (logData.carbs || 0) + carbsVal
    //     }, { merge: true });
    //     console.log(`Updated field ${field} in log ${logIdToUpdate}`);
    //   } else {
    //     // Log entry doesn't exist; create a new one
    //     const newLogRef = doc(logsRef); // Create a new log reference
    //     const newLogData = {
    //       date: inputDate, // Save the date as a Timestamp
    //       id: newLogRef.id,
    //       userId: userId,
    //       calories: caloriesVal,
    //       protein: proteinVal,
    //       fats: fatsVal,
    //       carbs: carbsVal,
    //     };
    //     await setDoc(newLogRef, newLogData);
    //     console.log(`Created new log for date ${date}`);
    //   }
  } catch (error) {
    console.log("Error saving new user:", error);
    console.log(error);
  }
};

export const saveExerciseFn = async (userId, exercise, duration, date) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const logsRef = collection(userDocRef, "Logs");

    // Query to check if a log with the same date already exists
    const logsSnapshot = await getDocs(logsRef);
    let logIdToUpdate = null;

    // Convert the Firestore Timestamp to a JavaScript Date
    const inputDate = date;

    logsSnapshot.forEach((doc) => {
      const logData = doc.data();
      const logDate = logData.date;

      // Check if the log date matches the input date
      if (logDate === inputDate) {
        logIdToUpdate = doc.id; // Store the ID of the log to update
      }
    });

    if (logIdToUpdate) {
      const logDocRef = doc(logsRef, logIdToUpdate);
      const exercisesRef = collection(logDocRef, "Exercises");

      const newExerciseRef = doc(exercisesRef); // Generate a new document reference

      // Set the exercise document
      await setDoc(newExerciseRef, {
        exercise: exercise,
        userID: userId,
        duration: duration,
        date: date,
        id: newExerciseRef.id, // Include the new document ID
      });

      console.log(
        `Added new exercise: ${exercise} with ID: ${newExerciseRef.id}`
      );
    } else {
      // Log doesn't exist
      const newLogRef = doc(logsRef); // Create a new log reference
      await setDoc(
        newLogRef,
        {
          id: newLogRef.id,
          date: date,
          userID: userId,
        },
        { merge: true }
      );
      const exercisesRef = collection(newLogRef, "Exercises");
      const newExerciseRef = doc(exercisesRef);
      const newLogData = {
        date: date,
        userID: userId,
        duration: duration,
        exercise: exercise,
        id: newExerciseRef.id,
      };
      await setDoc(newExerciseRef, newLogData);
      console.log(
        `Added new exercise: ${exercise} with ID: ${newExerciseRef.id}`
      );
    }
  } catch (error) {
    console.log("Error saving new user:", error);
    console.log(error);
  }
};

export const getExerciseFn = async (userId) => {
  // const exerciseByUser = await DataStore.query(Exercise, (el) =>
  //   el.userID.eq(userId)
  // );
  // return exerciseByUser;
};

export const deleteExerciseFn = async (logID) => {
  // const modelToDelete = await DataStore.query(Exercise, logID);
  // DataStore.delete(modelToDelete);
};
