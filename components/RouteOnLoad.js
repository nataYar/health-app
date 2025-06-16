'use client'
import { useContext, useEffect } from "react";
import { UserContext } from '../app/context/userProvider';
import { useRouter } from 'next/navigation';


import { Button } from "@mui/material";
const RouteOnLoad = () => {
  const { myUser, updateUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (myUser.id != undefined && myUser.id !== '') {
      router.push('/dashboard');
    } 
  }, [myUser]);

const switchToTestUser = () => {
    // Simulate a test user login
    const testUser = {
      id: process.env.NEXT_PUBLIC_TESTER_ID,
      email: 'n.yarysheva@gmail.com'
    };
    // Simulate setting the user context
    updateUser(testUser);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={switchToTestUser}
        sx={{ width: "auto", 
        backgroundColor: "indigo.main",
        boxShadow:"none",
        color:"neutral.200"
        }} >
        Sign in as Test User
      </Button>
    </>
  );
};

export default RouteOnLoad;

