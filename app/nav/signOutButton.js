"use client";

import { Box, ButtonBase} from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOutButton = ({ text }) => {
  const router = useRouter();

  async function signUserOut() {
      signOut(auth).then(() => {
        router.push("/auth") 
      }).catch((error) => {
        console.log(error)
      });
  }

  return (
    <ButtonBase
      onClick={signUserOut}
      sx={{
        justifySelf: "right",
        alignItems: "center",
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        pl: "16px",
        pr: "16px",
        py: "6px",
        mr: "16px",
        width: "contain",
      }}
    >
      <Box
        component="span"
        sx={{
          color: "primary.main",
          flexGrow: 1,
          fontFamily: (theme) => theme.typography.fontFamily,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: "24px",
          whiteSpace: "nowrap",
         
        }}
      >
        {text}
      </Box>
    </ButtonBase>
  );
};

export default SignOutButton;
