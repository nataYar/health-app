"use client";
import { useState, useEffect, useContext } from "react";
import SearchBar from "./SearchBar";
import BottomTable from "./BottomTable";
import SideTable from "./SideTable";
import { fetchNutritionData } from "../utils/foodData";
import { saveLogFn } from "../utils/userFn";
import { Stack } from "@mui/material";
import { UserContext } from "../context/userProvider";
import PopupModal from "@/components/PopupModal";
import dayjs from "dayjs";

const Food = () => {
  const { myUser } = useContext(UserContext);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [date, setDate] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      const nutrients = data.totalNutrients;
      const carbs = nutrients.CHOCDF?.quantity || 0;
      const fats = nutrients.FAT?.quantity || 0;
      const protein = nutrients.PROCNT?.quantity || 0;

      data.ingredients.map((el) => {
        el.parsed.map((ingr) => {
          setFoodItems((prevState) => [
            ...prevState,
            {
              weight: Math.round(ingr.weight),
              food: ingr.food,
              qty: ingr.quantity,
              unit: ingr.measure,
              calories: Math.floor(ingr.nutrients.ENERC_KCAL.quantity),
              carbs: Math.floor(carbs),
              fats: Math.floor(fats),
              protein: Math.floor(protein),
            },
          ]);
        });
      });
    }
  }, [data]);

  useEffect(() => {
    selectedDate ? setDate(selectedDate.format("YYYY-MM-DD")) : null;
  }, [selectedDate]);

  const searchRecipe = async (searchQuery) => {
    try {
      setFoodItems([]);
      const response = await fetchNutritionData(searchQuery);
      if (response !== undefined) {
        setData(response);
      }
    } catch (error) {
      console.error("Error while fetching recipe data:", error);
      alert("Error occured, try again");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const logData = () => {
    if (myUser.id && date && foodItems) {
      const sumOfCalories = foodItems.reduce(
        (totalCalories, item) => totalCalories + item.calories,
        0
      );
      const sumOfProteins = foodItems.reduce(
        (totalProtein, item) => totalProtein + item.protein,
        0
      );
      const sumOfFats = foodItems.reduce(
        (totalFats, item) => totalFats + item.fats,
        0
      );
      const sumOfCarbs = foodItems.reduce(
        (totalCarbs, item) => totalCarbs + item.carbs,
        0
      );
      saveLogFn(
        myUser.id,
        date,
        sumOfCalories,
        sumOfProteins,
        sumOfFats,
        sumOfCarbs
      );
      setIsModalOpen(true);
      setSelectedDate(dayjs());
      setFoodItems([]);
    }
  };

  return (
    <Stack
      sx={{
        flexDirection: { xs: "column", sm: "row" },
        width: "100%",
      }}
      justifyContent="space-between"
      spacing={0}
      flexWrap="wrap"
    >
      <Stack
        direction="column"
        flexWrap="wrap"
        sx={{
          width: { xs: "100%", sm: "60%" },
        }}
      >
        <SearchBar
          data={data}
          searchedTerm={searchedTerm}
          setSearchedTerm={setSearchedTerm}
          searchRecipe={searchRecipe}
        />
        {data ? (
          <BottomTable
            foodItems={foodItems}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleLogData={logData}
          />
        ) : null}
      </Stack>
      {/* {data ? <SideTable data={data} /> : null} */}
      <PopupModal
        text="food data logged!"
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Stack>
  );
};

export default Food;
