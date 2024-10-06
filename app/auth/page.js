"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userProvider";

import { TextField, Button, Card, Paper, Box, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { doc, collection, addDoc, getDoc, setDoc } from "firebase/firestore"; 

import PopupModal from "../../components/PopupModal";

function AuthContainer() {
  const { updateUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(auth, userEmail, password)
        // sessionStorage.setItem('user', true)
        updateUser({
              email: res.user.email, 
              id: res.user.uid,
              nickname: nickname
            });
            const docRef = doc(db, "users", res.user.uid); // Use res.user.uid as the document ID

            // Add a new document (user) in the "users" collection
            await setDoc(docRef, {
                nickname: nickname,
                email: userEmail,
                id: res.user.uid // Save the UID as well
            });
        setEmail('');
        setPassword('')
        setNickname('')
        return router.push("./dashboard")
    } catch(e){
        console.error(e)
        setIsModalOpen(true)
    }
  };

  const handleSignIn = async () => {
    try{
      const res = await signInWithEmailAndPassword(auth, userEmail, password)
      console.log(res)
      // sessionStorage.setItem('user', true)
      // Retrieve user ID from the response
      const userId = res.user.uid; 
      console.log(userId)
      const userDocRef = doc(db, "users", userId);
      console.log(userDocRef)
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc)
      
      if (userDoc.exists()) {
          const userData = userDoc.data(); // Get the user data from Firestore
          console.log(userData)
          // Update your user state with email, id, and nickname
          updateUser({
              email: res.user.email,
              id: userId,
              nickname: userData.nickname // Access the nickname from Firestore
          });
      } else {
          console.log("No such document!");
          setIsModalOpen(true);
          return; // Early return if user document does not exist
      }
      setEmail('');
      setPassword('')
      return router.push("./dashboard")
    }
    catch (e){
      console.log(e)
      setIsModalOpen(true)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };



  return (
    <Card
      component={Paper}
      sx={{ p: "12px", width: { xs: "100%", md: "280px" } }}
    >
        <Typography variant="h4" align="center" gutterBottom>
        {isSignUp ? "Sign Up" : "Sign In"}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
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
         {isSignUp ? 
         <TextField
         label="Nickname"
         variant="outlined"
         type="nickname"
         value={nickname}
         onChange={(e) => setNickname(e.target.value)}
         fullWidth
       />
         : null}
        
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

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button
          variant="text"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Button>
      </Box>
      <PopupModal
        text="Please check credentials"
        open={isModalOpen}
        onClose={handleCloseModal}
      />
      </Card>
  ) 
}

export default AuthContainer;
