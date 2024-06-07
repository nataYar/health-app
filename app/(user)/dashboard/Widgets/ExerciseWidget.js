"use client";
import { Card, Typography, Avatar, Grid, Divider } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { neutral } from "@/app/theme/colors";
import dayjs from "dayjs";

const ExerciseWidget = ({ exercisesDuration }) => {
  const { duration, average, lastDate } = exercisesDuration;

  return (
    <Card
      sx={{ p: "12px", height: "155px", width: { xs: "100%", md: "280px" } }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        width="100%"
      >

        <Grid item display='flex' alignItems="baseline">
          <Typography
            sx={{
              fontSize: "2.125rem",
              fontWeight: 500,
              mr: 1,
            }}
          >
            {duration}
            <span
              style={{
                fontSize: "14px",
                color: neutral[500],
              }}
            >
               {duration ? " min" : null}

            </span>
          </Typography>
          {
            lastDate ? (
              <Typography variant="subtitle2"
              sx={{ 
                fontSize: "14px",
              color: neutral[500],
              fontWeight:"500"}}>
              | {dayjs(lastDate).format("MMMM DD")}
            </Typography>
            ) : null
          }
        </Grid>
        <Grid item>
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor: "white",
              color: "primary.main",
              mt: 1,
              borderRadius: "50%",
              height: "auto",
              width: " auto",
            }}
          >
            <FitnessCenterIcon sx={{ height: "30px", width: " 30px" }} />
          </Avatar>
        </Grid>
      </Grid>

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
              Daily exercises
            </Typography>
          </Grid>
        </Grid>
        <Grid item sx={{ mb: 1.25 }}>
        <Divider />
          <Typography
            variant="body2"
            sx={{
              color: neutral[500],
              mb: 0.75,
            }}
          >
            <span style={{ fontSize: "16px", color: "#6366F1" }}>
              {average} min{" "}
            </span>{" "}
            - average time
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExerciseWidget;
