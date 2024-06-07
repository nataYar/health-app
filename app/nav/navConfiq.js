import RamenDiningRoundedIcon from '@mui/icons-material/RamenDiningRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import NewspaperRoundedIcon from '@mui/icons-material/NewspaperRounded';
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

export const topNavItems = [
  {
    text: 'Home',
    icon: <DashboardRoundedIcon />,
    link: '/dashboard' 
  },
  {
    text: 'Goals',
    icon: <StarRoundedIcon/>,
    link: '/goals' 
  }
]

export const navItems = [
    {
      text: 'Food Log',
      icon: <RamenDiningRoundedIcon />,
      link: '/food', 
      subItems: [
        { text: 'Search Recipes', link: '/food/recipes' },
      ],
    },
    {
      text: 'Fitness Log',
      icon: <FitnessCenterRoundedIcon />,
      link: '/fitness', 
      subItems: [
        { text: 'Search Exercises', link: '/fitness/exercises' },
       
      ],
    },
    {
      text: 'Weight Log',
      icon: <LocalHospitalRoundedIcon />, 
      link: '/health', 
    },
  ];