"use client";
import { Card, Typography, Avatar, Grid2, Divider } from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { neutral } from "@/app/theme/colors";
import dayjs from "dayjs";

const ExerciseWidget = ({ exercisesDuration }) => {
  const { duration, average, lastDate } = exercisesDuration;

  return (
    <Card
      sx={{ p: "12px",  width: { xs: "100%", md: "30%" } }}
    >
      <Grid2
        container
        direction="row"
        justifyContent="space-between"
        alignItems="baseline"
        width="100%"
      >

        <Grid2  display='flex' alignItems="baseline">
          <Typography
            sx={{
              fontSize: "2.125rem",
              fontWeight: 500,
              mr: 1,
            }}
          >
            {duration }
            <span
              style={{
                fontSize: "14px",
                color: neutral[500],
              }}
            >
               {duration ? " min" : "No exercises logged"}

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
        </Grid2>
        <Grid2 >
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
        </Grid2>
      </Grid2>

      <Grid2 container direction="column">
        <Grid2  sx={{ mb: 1.25 }}>
          <Grid2 container justifyContent="space-between" width="100%">
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
                color: "neutral.900",
                mb: 0.75,
              }}
            >
              {duration ? "" : ""}
              
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2  sx={{ mb: 1.25 }}>
        <Divider />
          <Typography
            variant="body2"
            sx={{
              color: neutral[500],
              mb: 0.75,
            }}
          >
            <span style={{ fontSize: "16px", color: "#6366F1" }}>
              {average ? `${average} min in average` : null}
            </span>{" "}
            {/* - average time */}
          </Typography>
        </Grid2>
      </Grid2>
    </Card>
  );
};

export default ExerciseWidget;
