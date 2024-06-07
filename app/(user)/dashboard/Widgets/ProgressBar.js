import Box from '@mui/material/Box';
import { extraColors } from '@/app/theme/colors';

const ProgressBar = ({ percentage }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '6px',
        border: '1px solid',
        borderColor:'neutral.200',
        backgroundColor: 'neutral.300',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: `${percentage ? percentage : 0}%`,
          height: '100%',
          backgroundColor: 'extraColors.green',
        }}
      />
    </Box>
  );
};

export default ProgressBar;
