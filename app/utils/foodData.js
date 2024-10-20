const foodApiId = process.env.NEXT_PUBLIC_EDAMAM_FOOD_ID;
const foodApiKey = process.env.NEXT_PUBLIC_EDAMAM_FOOD_KEY;

const nutritionApiId = process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ID;
const nutritionApiKey = process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_KEY;

const recipeApiId = process.env.NEXT_PUBLIC_EDAMAM_RECIPE_ID;
const recipeApiKey = process.env.NEXT_PUBLIC_EDAMAM_RECIPE_KEY;


export const fetchFoodData = async (searchQuery) => {
  console.log(foodApiId)
  console.log(foodApiKey)

  // try {
  //   const response = await fetch(
  //     `https://api.edamam.com/api/food-database/v2/parser?app_id=${foodApiId}&app_key=${foodApiKey}&ingr=${searchQuery}&nutrition-type=logging`
  //   );

  //   if (!response.ok) {
  //     throw new Error("Request failed");
  //   }

  //   const data = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error(error);
  // }
};

export const fetchNutritionData = async (searchQuery) => {
  try {
    const ingr = searchQuery.includes("\n")
    ? searchQuery.trim().split("\n")
        .map(str => str.trim().replace(/(^,)|(,$)/g, ''))
    : [searchQuery];

    
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${nutritionApiId}&app_key=${nutritionApiKey}`;
   

    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingr }),
    });

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      alert('Nothing was found')
      // Handle non-200 status code
      console.error("Server error occurred");
      return;
      // Display an error message or take appropriate action
    }
  } catch (error) {
    console.log(error)
  }
};

export const fetchRecipeData = async (searchQuery, diet = "", allergy = "") => {
  try {
    let apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchQuery}&app_id=${recipeApiId}&app_key=${recipeApiKey}`;
    

    if (diet) {
      apiUrl += `&diet=${diet}`;
    }

    if (allergy) {
      apiUrl += `&health=${allergy}`;
    }
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};