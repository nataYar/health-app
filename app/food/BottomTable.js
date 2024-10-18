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
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const BottomTable = ({ foodItems, selectedDate, setSelectedDate, handleLogData, handleDeleteItem }) => {

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
          onClick={handleLogData}
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
          backgroundColor: "green",
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
                <b>Weight (g)</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            { foodItems
              ? foodItems.map((el, ind) => (
                <> 
                <TableRow key={ind} sx={{
                    
                    borderRadius: "20px",
                    color: "neutral.800",
                  }}
                  >
                  <TableCell>{el.qty}</TableCell>
                  <TableCell>{el.unit}</TableCell>
                  <TableCell>{el.food}</TableCell>
                  <TableCell>{el.calories}</TableCell>
                  <TableCell>{el.weight}</TableCell>
                  <CancelRoundedIcon 
                  onClick ={() => handleDeleteItem(ind)}
                  sx={{
                    marginTop:"50%",
                    
                  }}/>
                </TableRow>
                
                </>
                 
                ))
              : null }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BottomTable;
