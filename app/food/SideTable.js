import {
  Box,
  Divider,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const flex = {
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
  py: "2px",
};

const flexPy = {
  direction: "row",
  justifyContent: "space-between",
  alignItems: "center",
  py: "1px",
};

const SideTable = ({ data }) => {

  return (
    <Box
      component={Paper}
      sx={{
        width: { xs: "100%", sm: "35%" },
        p: "20px",
        height: "auto",
        mb: "30px",
        borderRadius: "20px",
        color: "neutral.800",
      }}
    >
      <Typography
        sx={{ color: "#111927", mb: "12px" }}
        textAlign="center"
        variant="h5"
      >
        Nutrition Facts
      </Typography>
      <Divider sx={{ borderWidth: "1px" }} />
      <Typography variant="subtitle2" sx={{ textAlign: "left", mt: "10px" }}>
        Amount Per Serving for
      </Typography>
      {data
        ? data.ingredients.map((el, ind) => (
          <Typography key={ind}variant="subtitle2" sx={{ 
            color: "neutral.400",
            textAlign: "left", my: "5px" }}>
          {el.text}
          </Typography>
          )
        )
        : null}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">Calories</Typography>
        <Typography variant="h5">{data.calories}</Typography>
      </Stack>
      <Divider sx={{ borderWidth: "1px" }} />
      <Typography
        variant="subtitle2"
        sx={{ fontSize: "10px", fontWeight: "700", textAlign: "right" }}
      >
        % Daily Value*
      </Typography>
      <List>
        {data
          ? Object.keys(data.totalDaily).map((key) => {
              const pObj = data.totalDaily[key]; //percentage
              const pObjQ = Math.round(pObj.quantity);

              const nObj = data.totalNutrients[key]; //nutrients mg
              const nObjQ = Math.round(nObj.quantity);

              return (
                <ListItem key={key} sx={flex}>
                  <Stack direction="row" alignItems="baseline" useFlexGap>
                    <Typography variant="subtitle1" sx={{ fontSize: "8" }}>
                      <strong>{pObj.label} </strong>
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ ml: "5px", color: "neutral.400" }}
                    >
                      {" "}
                      {nObjQ}
                      {nObj.unit}
                    </Typography>
                  </Stack>

                  <Typography variant="subtitle1" align="right">
                    <strong>
                      {pObjQ} {pObj.unit}
                    </strong>
                  </Typography>
                </ListItem>
              );
            })
          : null}
      </List>
    </Box>
  );
};

export default SideTable;
