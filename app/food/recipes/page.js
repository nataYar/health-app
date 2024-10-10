"use client";

import { useState } from "react";

import {
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  InputBase,
  Paper,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";


import SearchIcon from "@mui/icons-material/Search";

import { diets, allergies } from "./searchQ";
import { fetchRecipeData } from "@/app/utils/foodData";
import RecipeCard from "./RecipeCard";
import PopupModal from "../../../components/PopupModal";

const Recipes = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [diet, setDiet] = useState("");
  const [allergy, setAllergy] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getRecipes = async () => {
    try {
      const response = await fetchRecipeData(search, diet, allergy);
      if (response !== undefined) {
        const recipesArray = Array.isArray(response) ? response : [response];
        setRecipes(recipesArray);
        setSearch("");
      } else {
        setIsModalOpen(true);
        console.log("nothing was returned");
      }
    } catch (error) {
      console.error("Error while fetching recipe data:", error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDietSelection = (e) => {
    let selected = e.target.value;
    setDiet(selected);
  };

  const handleAllergySelection = (e) => {
    let selected = e.target.value;
    setAllergy(selected);
  };

  return (
    <Stack width="100%" direction="column" alignItems="center" >
      <Box
        width="100%" 
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSearchSubmit}

        sx={{ display: 'flex', direction:'row', justifyContent:'center'}}

      >
        <Paper
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: {xs: '100%', md: '400px'},
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search recipes"
            inputProps={{ "aria-label": "search google maps" }}
            value={search}
            onChange={updateSearch}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="submit"
            onClick={handleSearchSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit(e);
              }
            }}
            color="primary"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>

      <Stack
        width="100%"
        direction="row"
        justifyContent="center"
        marginTop="20px"
        marginBottom="20px"
      >
        <FormControl sx={{ p: "0" }}>
          <InputLabel>diets</InputLabel>
          <Select
            value={diet}
            name="Diet"
            onChange={(e) => handleDietSelection(e)}
            sx={{
              minWidth: "100px",
              width: "auto",
              mr: "20px",
            }}
          >
            <MenuItem value="">Select a diet</MenuItem>
            {diets.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ p: "0" }}>
          <InputLabel>allergies</InputLabel>
          <Select
            value={allergy}
            name="Diet"
            onChange={(e) => handleAllergySelection(e)}
            sx={{
              minWidth: "110px",
              width: "auto",
              mr: "20px",
            }}
          >
            <MenuItem value="">Select a diet</MenuItem>
            {allergies.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Masonry columns={{ xs: 1, md: 2 }} spacing={4}
      height='100%'>
        {recipes.length > 0 ? (
          recipes[0].hits.map(( el, index) => (
              <RecipeCard
                key={index} 
                title={el.recipe.label}
                image={el.recipe.image}
                calories={el.recipe.calories}
                cuisineType={el.recipe.cuisineType[0]}
                dietLabels={el.recipe.dietLabels}
                ingredients={el.recipe.ingredients}
                totalWeight={el.recipe.totalWeight}
              />
          ))
        ) : (
          <></>
        )}
      </Masonry>
      <PopupModal
        text="Nothing found"
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Stack>
  );
};

export default Recipes;
