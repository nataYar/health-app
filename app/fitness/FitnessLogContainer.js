"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useState } from "react";
import { deleteExerciseFn } from "../utils/userFn";

const FitnessLogContainer = ({ exercises }) => {
  const [anchorRow, setAnchorRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null)

  const handleDeleteItem = () => {
    deleteExerciseFn(selectedRowId)
    handleCloseRowMenu();
    setSelectedRowId(null)
  };

  const handleOpenRowMenu = (event, id) => {
    setAnchorRow(event.currentTarget);
    setSelectedRowId(id); // Store the id of the clicked row in a separate state variable
  };

  const handleCloseRowMenu = () => {
    setAnchorRow(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "20px",
      }}
    >
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
                <b>Activity</b>
              </TableCell>
              <TableCell>
                <b>Duration</b>
              </TableCell>
              <TableCell>
                <b>Date</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {exercises
              ? exercises.map((el, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{el.exercise}</TableCell>
                    <TableCell>{el.duration}</TableCell>
                    <TableCell>{el.date}</TableCell>
                    <TableCell sx={{ width: "10px" }}>
                      <Tooltip title="Open settings">
                        <MoreHorizRoundedIcon
                          sx={{ color: "neutral.500" }}
                          onClick={(e) => handleOpenRowMenu(e, el.id)}
                          size="small"
                        />
                      </Tooltip>

                      <Menu
                        sx={{
                          mt: "23px",
                        }}
                        anchorEl={anchorRow}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorRow)}
                        onClose={handleCloseRowMenu}
                      >
                        <MenuItem
                          sx={{ backgroundColor: "white" }}
                          onClick={() => handleDeleteItem(el.id)}
                        >
                          Delete
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FitnessLogContainer;
