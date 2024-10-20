"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userProvider";

import {
  TextField,
  Button,
  Card,
  Grid2,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import PopupModal from "../../components/PopupModal";

function AuthContainer() {
  const { updateUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(()=>{
   console.log(userEmail)
  }, [userEmail])

  const handleSignUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      // sessionStorage.setItem('user', true)
      updateUser({
        email: res.user.email,
        id: res.user.uid,
      });
      const docRef = doc(db, "users", res.user.uid); // Use res.user.uid as the document ID

      // Add a new document (user) in the "users" collection
      await setDoc(docRef, {
        email: userEmail,
        id: res.user.uid, // Save the UID as well
      });
      setEmail("");
      setPassword("");
      return router.push("./dashboard");
    } catch (e) {
      console.error(e);
      setIsModalOpen(true);
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      console.log(email, password)
      const res = await signInWithEmailAndPassword(auth, email, password);
      // sessionStorage.setItem('user', true)
      // Retrieve user ID from the response
      const userId = res.user.uid;
      // console.log(userId)
      const userDocRef = doc(db, "users", userId);
      // console.log(userDocRef)
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc)

      if (userDoc.exists()) {
        const userData = userDoc.data(); // Get the user data from Firestore
        // Update your user state with email, id
        console.log(userData)
        updateUser({
          email: userData.email,
          id: userData.id,
        });
      } else {
        console.log("No such document!");
        setIsModalOpen(true);
        return; // Early return if user document does not exist
      }
      setEmail("");
      setPassword("");
      return router.push("./dashboard");
    } catch (e) {
      console.log(e);
      setModalText("Please check credentials");
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn(userEmail, password);
    }
  };

  const openResetForm = () => {
    router.push("/reset");
  }
  return (
    <Card
      component={Paper}
      sx={{ p: "12px", width: { xs: "100%", md: "380px" } }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
       

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </Box>

      <Box sx={{ textAlign: "center", mt: 2 }}>
        {isSignUp ? (
          <Grid2 container alignItems="center">
            <Typography>Already have an account? </Typography>
            <Button variant="text" onClick={() => setIsSignUp(!isSignUp)}>
              Sign In
            </Button>
          </Grid2>
        ) : (
          <>
            <Grid2 container alignItems="center">
              <Typography>Don't have an account? </Typography>
              <Button variant="text" onClick={() => setIsSignUp(!isSignUp)}>
                Sign Up
              </Button>
            </Grid2>
            <Grid2 container alignItems="center">
              <Typography sx={{ color: "neutral.900" }}>
                Forgot password?{" "}
              </Typography>
              <Button
                sx={{ color: "primary" }}
                variant="text"
                onClick={() => openResetForm()}
              >
                Reset
              </Button>
            </Grid2>
          </>
        )}
      </Box>

      <PopupModal
        text={modalText}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  );
}

export default AuthContainer;
