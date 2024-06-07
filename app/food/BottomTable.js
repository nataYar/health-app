"use client";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  Box
} from "@mui/material";
import DatePickerContainer from "@/components/DatePickerContainer";
import { useEffect } from "react";

const BottomTable = ({ foodItems, selectedDate, setSelectedDate, handleLogData }) => {
  
  const aggToLog = () => {
    handleLogData()
  }

console.log(foodItems)

  return (
    <Box
      component={Paper}
      sx={{
        my: "30px",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
          p: "16px",
        }}
      >
        <DatePickerContainer
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          widthMd="160px"
        />
        <Button
          variant="contained"
          disabled={ foodItems.length==0}
          onClick={aggToLog}
          sx={{
            width: "auto",
            backgroundColor: "primary.main",
            marginLeft: "8px",
            marginTop: { xs: "16px", md: "0px" },
          }}
        >
          Log meal
        </Button>
      </Box>

      <TableContainer
        sx={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "common.white",
          color: "neutral.800",
        }}
      >
        <Table
          sx={{
            backgroundColor: "white",
          }}
        >
          <TableHead
            sx={{
              backgroundColor: "white",
            }}
          >
            <TableRow
              sx={{
                backgroundColor: "white",
              }}
            >
              <TableCell
                sx={{
                  backgroundColor: "white",
                }}
              >
                <b>Qty</b>
              </TableCell>
              <TableCell>
                <b>Unit</b>
              </TableCell>
              <TableCell>
                <b>Food</b>
              </TableCell>
              <TableCell>
                <b>Calories</b>
              </TableCell>
              <TableCell>
                <b>Weight</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {foodItems
              ? foodItems.map((el, ind) => (
                  <TableRow
                    key={ind}
                  >
                    <TableCell>{el.qty}</TableCell>
                    <TableCell>{el.unit}</TableCell>
                    <TableCell>{el.food}</TableCell>
                    <TableCell>{el.calories}</TableCell>
                    <TableCell>{el.weight}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BottomTable;
