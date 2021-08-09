import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";

function App() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("en");
  const [meanings, setMeanings] = useState([]);

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
    <div className="App">
      <Container
        maxWidth="md"
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <Header
          word={word}
          setWord={setWord}
          category={category}
          setCategory={setCategory}
        />

        {meanings && (
          <Definitions word={word} meanings={meanings} category={category} />
        )}
      </Container>
    </div>
  );
}

export default App;
