'use client'
import { useEffect } from 'react';
import { UserProvider  } from './userProvider'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '../theme/index';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CssBaseline } from "@mui/material";
import { Amplify } from 'aws-amplify'
import awsmobile from "../aws-exports";
Amplify.configure(awsmobile);


export function Providers({ children }) {
  const theme = createTheme();
  useEffect(() => {
    document.body.style.overflow = "visible"; // Set overflow to visible on mount
    return () => {
    };
  }, []);

  return (
    <>
     <CssBaseline />
    <ThemeProvider theme={theme}>
      <UserProvider >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
      </UserProvider >
    </ThemeProvider>
    </>

  )
}