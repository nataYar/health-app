"use client";
import { useState, useContext  } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/userProvider";
import {
  TextField,
  Button,
  Card,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import {
  sendPasswordResetEmail
} from "firebase/auth";

import { auth } from "../firebase";

import PopupModal from "../../components/PopupModal";

function ResetPassword() {
  const { updateUser } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState(""); 
  const [userEmail, setEmail] = useState("");
  const router = useRouter();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Admin SDK API to generate the password reset link.

  const resetPassword = async () => {
    try{
      const actionCodeSettings = {
        url: 'https://nat-health-hub.netlify.app/dashboard', // The URL to redirect to after the password reset
        handleCodeInApp: true, // This should be true to handle the action in your app
      };
  
      const res = await sendPasswordResetEmail(auth, userEmail, actionCodeSettings)
      
      setModalText("Password reset email was sent");
      setIsModalOpen(true);

      console.log(res)
      
      updateUser({
        email: res.user.email,
        id: res.user.uid,
      });
  
    
    } catch(error) {
      console.log(error);
    };
  };

  const goToAuth =() => {
    router.push("/auth");
  }

  return (
    <Card
      component={Paper}
      sx={{ p: "12px", width: { xs: "100%", md: "380px" } }}
    >
      
      <Grid2
        direction="column"
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
         <Button variant="text" onClick={resetPassword}>
            Send email
        </Button>

        <Grid2
        container alignItems="center"
        
        >
        <Typography
          
        >Remember your password?</Typography>
        <Button variant="text" onClick={goToAuth}>
            Go to sign in page
        </Button>

      </Grid2>
        
      </Grid2>

      <PopupModal
        text={modalText}
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Card>
  );
}

export default ResetPassword;

