"use client";
import { useContext } from "react";
import { UserContext } from "../../../context/userProvider";
import { Card, Typography, Avatar, Grid } from "@mui/material";

import ProgressBar from "./ProgressBar";
import RamenDiningRoundedIcon from "@mui/icons-material/RamenDiningRounded";
import { extraColors, neutral } from "@/app/theme/colors";

const CaloryWidget = ({ currentCaloriesGoal, caloriesToday }) => {
  const { myUser, updateUser } = useContext(UserContext);

  let percentConsumed;
  if (currentCaloriesGoal && caloriesToday) {
    percentConsumed = (caloriesToday / currentCaloriesGoal) * 100;
  }

  // Function to determine the value to be rendered
  const getCaloriesText = () => {
    if (currentCaloriesGoal && caloriesToday && currentCaloriesGoal > caloriesToday) {
      return (
        <Typography
          variant="body1"
          sx={{
            fontSize: "2.125rem",
            fontWeight: 500,
          }}
        >
          {currentCaloriesGoal - caloriesToday}
        </Typography>
      );
    }  else if (currentCaloriesGoal && caloriesToday && currentCaloriesGoal < caloriesToday) {
      return (
        <Typography
          variant="body1"
          sx={{
            fontSize: "2.125rem",
            fontWeight: 500,
          }}
        >
         "0"
        </Typography>
      );
    }
    else if (!currentCaloriesGoal && caloriesToday) {
      return (
        <Typography
          variant="body1"
          sx={{
            fontSize: "2.125rem",
            fontWeight: 500,
          }}
        >
          {caloriesToday}
          <span style={{ fontSize: "14px", color: neutral[500] }}>
            {" "}
            consumed
          </span>
        </Typography>
      );
    } else if (currentCaloriesGoal && !caloriesToday) {
      return (
        <Typography
        variant="body1"
        sx={{
          fontSize: "2.125rem",
          fontWeight: 500,
        }}
      >{currentCaloriesGoal}</Typography>
      )
    } else if (!currentCaloriesGoal && !caloriesToday) {
      return (
        <span style={{ fontSize: "14px", color: neutral[500], lineHeight:"14px" }}>
          Add consumed food to display calories
        </span>
      );
    }
  };

  return (
    <Card
      sx={{ p: "12px", width: { xs: "100%", md: "280px" }, height: "155px" }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        width="100%"
      >
        <Grid item width="80%">
            {getCaloriesText()}
        </Grid>
        <Grid item>
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: "white",
              color: "extraColors.green",
              mt: 1,
              borderRadius: "50%",
              height: "auto",
              width: " auto",
            }}
          >
            <RamenDiningRoundedIcon sx={{ height: "30px", width: " 30px" }} />
          </Avatar>
        </Grid>
      </Grid>

      {currentCaloriesGoal ? (
        <Grid container direction="column">
          <Grid item sx={{ mb: 1.25 }}>
            <Grid container justifyContent="space-between" width="100%">
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "neutral.900",
                  mb: 0.75,
                }}
              >
                Remaining calories for today
              </Typography>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: 1.25 }}>
            <ProgressBar percentage={percentConsumed} />
          </Grid>
          {myUser.id.length > 0 ? (
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                variant="body2"
                sx={{
                  color: "neutral.500",
                  mb: 0.75,
                }}
              >
                <span style={{ fontSize: "16px", color: extraColors.green }}>
                  {caloriesToday ? caloriesToday : 0}
                </span>{" "}
                out of{" "}
                <span style={{ fontSize: "16px", color: extraColors.green }}>
                  {currentCaloriesGoal}
                </span>
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      ) : null}
    </Card>
  );
};

export default CaloryWidget;
