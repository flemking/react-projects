import React from "react";
import {
  createTheme,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import categories from "../../data/categories";
import "./Header.css";

const Header = ({ category, setCategory, word, setWord, LightMode }) => {
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: LightMode ? "#212121" : "#fff",
      },
      type: LightMode ? "light" : "dark",
    },
  });

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const handleChange = (language) => {
    setCategory(language);
    setWord("");
  };

  return (
    <div className="header">
      <span className="title">{word ? word : "Globe Dico"}</span>
      <div className="inputs">
        <ThemeProvider theme={darkTheme}>
          <TextField
            id="outlined-basic"
            label="Type a word"
            variant="outlined"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />

          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">
              Choose Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={category}
              onChange={(e) => handleChange(e.target.value)}
            >
              {categories.map((category) => {
                return (
                  <MenuItem key={category.label} value={category.label}>
                    {category.value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default Header;
