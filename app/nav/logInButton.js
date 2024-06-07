"use client";
import { Box, ButtonBase} from "@mui/material";
import { useRouter } from "next/navigation";

const LogInButton = () => {
  const router = useRouter();

  const handleClick = () => {
     router.push("/auth") 
  };

  return (
    <ButtonBase
      onClick={handleClick}
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
        Log in
      </Box>
    </ButtonBase>
  );
};

export default LogInButton;
