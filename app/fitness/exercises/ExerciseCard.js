"use client";
import { useState } from "react";
import { Typography, Stack} from "@mui/material";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
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
        m:  { xs: "0px", sm: "50px" },
        position: "relative",
        width: { xs: "100%", sm: "350px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
      >
        {exercise.name}
      </Typography>
      <img
      style={{
        borderRadius:"10px"
      }}
        className={styles.exercise_card}
        src={exercise.gifUrl}
        alt={exercise.name}
        loading="lazy"
      />
      <Stack direction="row"
      sx={{
        mt: "12px"
      }}>
        <Typography
          sx={{
            ml: "21px",
            color: "#fff",
            background: neutral[500],
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
            p:"10px"
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
            p:"10px"
          }}
        >
          {exercise.target}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ExerciseCard;
