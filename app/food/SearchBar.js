import { Box, Grid, TextField, Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchedTerm, setSearchedTerm, searchRecipe }) => {
 
  const handleSearch = () => {
    searchRecipe(searchedTerm);
    clearInput();
  };

  const handleInputChange = (e) => {
    setSearchedTerm(e.target.value);
  };

  const clearInput = () => {
    setSearchedTerm("");
  };


  return (
    <Box
    component={Paper}
      sx={{
        width: "100%", 
        p: "20px",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mb: "15px",
          color: "neutral.800",
        
        }}
      >
        <TextField
          sx={{
            mx: "0",
            px: "0",
            width: "100%",
            borderColor: "transparent",
            borderRadius: "20px",
            backgroundColor: "common.white",
            color: "neutral.800",
            outline: "none",
          }}
          multiline
          rows={4}
          placeholder={`Enter an ingredient list of your meal, like \n1 cup rice,\n10 oz chickpeas\nEnter each ingredient on a new line.`}
          value={searchedTerm}
          onChange={handleInputChange}
        />
      </Box>
      <Grid container direction="row" justifyContent="flex-start" spacing={1}>
        <Grid item>
          <Button
            variant="contained"
            disabled={!searchedTerm}
            onClick={clearInput}
            sx={{ width: "auto", 
            backgroundColor: "neutral.200",
            boxShadow:"none",
             color:"neutral.800"
           }}
          >
            Clear input
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={!searchedTerm}
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            sx={{ width: "auto" }}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchBar;
