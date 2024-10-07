'use client'
import { useEffect } from "react";
import { Dialog, DialogContent, Typography } from "@mui/material";

const PopupModal = ({ text, open, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2200);

    return () => {
      clearTimeout(timer);
    };
  }, [open, onClose]);

  return open ? (
    <Dialog
    style={{
      borderRadius:"12px",
      width:"300px",
      height: "fit-content"
    }}
      open={open}
      onClose={onClose}
      sx={{
        position: 'absolute',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '100',
        display: 'flex',
        flexDirection: 'column',
        borderRadius:"12px",
        padding: '20px',
        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
    >
      <DialogContent>
        <Typography variant="body1">{text}</Typography>
      </DialogContent>
    </Dialog>
  ) : null;
};

export default PopupModal;

