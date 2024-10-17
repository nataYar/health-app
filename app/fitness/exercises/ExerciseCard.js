"use client";
import { useState } from "react";
import { Typography, Stack } from "@mui/material";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import styles from "./fitness.module.css";
import { neutral } from "@/app/theme/colors";
const ExerciseCard = ({ exercise }) => {
  // const [isLiked, setIsLiked] = useState(exercise.like);

  const handleClick = () => {
    setIsLiked(!isLiked);
    exercise.like = !isLiked;
  };

  return (
    <Stack
      sx={{
        m: { xs: "0px", sm: "" },
        position: "relative",
        width: { xs: "100%", sm: "50%", md: "100%" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent:"space-between"
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: { xs: "100%", md: "45%" },
        }}
      >
        <Typography
          ml="21px"
          color="#000"
          fontWeight="bold"
          sx={{
            height: "auto",
            fontSize: "20px",
          }}
          mt="12px"
          pb="10px"
          textTransform="capitalize"
          textAlign="center"
        >
          {exercise.name}
        </Typography>
        <Stack 
         sx={{ 
           pb: "10px",
           display: "flex",
           flexDirection: "row",
           alignItems: "center",
           justifyContent:"center"
         }}>
          <Typography
            sx={{
              ml: "21px",
              color: "#fff",
              background: neutral[500],
              fontSize: "14px",
              borderRadius: "20px",
              textTransform: "capitalize",
              p: "10px",
            }}
          >
            {exercise.bodyPart}
          </Typography>
          <Typography
            sx={{
              ml: "21px",
              color: "#fff",
              background: neutral[900],
              fontSize: "14px",
              borderRadius: "20px",
              textTransform: "capitalize",
              p: "10px",
            }}
          >
            {exercise.target}
          </Typography>
        </Stack>
        <img
          style={{
            borderRadius: "10px",
          }}
          className={styles.exercise_card}
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
        />
      </Stack>

      <Stack
        sx={{
          position: "relative",
          width: { xs: "100%", md: "48%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {exercise.instructions.map((el, idx) => (
          <Typography
            sx={{
              width: "100%",
              fontSize: "14px",
              p: "10px",
            }}
          >
            {idx + 1 + ") "}
            {el}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
};

export default ExerciseCard;
