import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Switch, withStyles } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import { grey } from "@material-ui/core/colors";
import Footer from "./components/Footer/Footer";

function App() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("en");
  const [meanings, setMeanings] = useState([]);
  const [LightMode, setLightMode] = useState(false);

  const ToggleMode = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const dictionaryApi = async () => {
    //trying to use axios and see how it works
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );

      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
    // let data = [];
    // await fetch(
    //   `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
    // )
    //   .then((res) => res.json())
    //   .then((dt) => {
    //     data = [...dt];
    //     setMeanings(data);
    //   })
    //   .catch((error) => console.log(error));
  };

  console.log(meanings);

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div className={LightMode ? "lightmode" : "App"}>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            paddingTop: 10,
          }}
        >
          <span>{LightMode ? "Dark" : "Light"} Mode</span>
          <ToggleMode
            checked={LightMode}
            onChange={() => setLightMode(!LightMode)}
          />
        </div>
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
          LightMode={LightMode}
        />

        {meanings && (
          <Definitions
            word={word}
            meanings={meanings}
            category={category}
            LightMode={LightMode}
          />
        )}

        <Footer />
      </Container>
    </div>
  );
}

export default App;
