'use client'

import { Box } from '@mui/material';
import WeightLogger from './WeightLogger';

const Health = () => {
  return (
    <Box sx={{
      width: '100%', 
     display: "flex",
    flexFlow: 'column wrap',
    justifyContent: 'center',
    alignItems: {xs: 'center', md: 'flex-start'},
    }}>
      <WeightLogger />
    </Box>
  )
}

export default Health