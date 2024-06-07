import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardMedia,
  Divider,
  ListItemIcon,
} from "@mui/material";

const RecipeCard = ({
  title,
  image,
  calories,
  cuisineType,
  dietLabels,
  ingredients,
  totalWeight,
}) => {
  return (
    <Card 
    // sx={{ width: "350px", height: "auto" }}
    >
      <CardHeader sx={{ textAlign: "center" }} title={title} />

      <Typography
        sx={{ color: "neutral.300", textAlign: "center" }}
        variant="body2"
      >
        cuisine
      </Typography>

      <Typography
        sx={{
          color: "neutral.800",
          px: "24px",
          pb: "10px",
          textAlign: "center",
        }}
        variant="body1"
      >
        {cuisineType.charAt(0).toUpperCase() + cuisineType.slice(1)}
      </Typography>

      {dietLabels.length > 0 ? (
        <>
          <Typography
            sx={{
              color: "neutral.300",
              textAlign: "center",
              mt: "10px",
              mb: "0px",
              pb: "0px",
            }}
            variant="body2"
          >
            diet
          </Typography>
          <List sx={{ m: "0", p: "0" }}>
            {dietLabels.map((el, ind) => (
              <ListItem
                key={ind}
                disablePadding
                sx={{ color: "neutral.800", mb: "0px", textAlign: "center" }}
              >
                <ListItemText primary={el} />
              </ListItem>
            ))}
          </List>
        </>
      ) : null}


      <CardMedia
        component="img"
        src={image}
        alt=""
        sx={{
          ml: "auto",
          mr: "auto",
          mt: "32px",
          width: "50%",
          borderRadius: "8px",
        }}
      />

      <CardContent>
        <Typography sx={{ color: "neutral.400", mb: "10px" }} variant="body2">
          Calories:{" "}
          <span
            style={{ color: "#1C2536", fontSize: "14px", paddingLeft: "7px" }}
          >
            {" "}
            {Math.round(calories)}
          </span>
        </Typography>

        <Typography sx={{ color: "neutral.400", mb: "10px" }} variant="body2">
          Total weight:
          <span
            style={{ color: "#1C2536", fontSize: "14px", paddingLeft: "7px" }}
          >
            {Math.round(totalWeight)}
          </span>
        </Typography>
        <Divider />

        <Typography sx={{ color: "neutral.400", mt: "10px" }} variant="body2">
          Ingredients:
        </Typography>
        <List>
          {ingredients.map((ingredient, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ color: "neutral.800", my: "5px" }}
            >
              <ListItemIcon
                sx={{
                  minWidth: "20px",
                }}
              >
                <span>&bull;</span>
              </ListItemIcon>
              <ListItemText sx={{ ml: "0px" }} primary={ingredient.text} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
