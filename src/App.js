import React, { useState } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

// console.log(process.env.REACT_APP_IMDB_API_KEY);

const App = () => {
  const key = process.env.REACT_APP_IMDB_API_KEY;
  const apiurl = "http://www.omdbapi.com/";
  const apikey = `&apikey=${key}`;

  const [state, setState] = useState({
    text: "",
    results: [],
    selected: {},
  });

  const handleInput = (e) => {
    let text = e.target.value;
    setState((prevState) => {
      return { ...prevState, text: text };
    });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "?s=" + state.text + apikey).then(({ data }) => {
        let results = data.Search;
        console.log(results);
        setState((prevState) => {
          return {
            ...prevState,
            results: results,
          };
        });
      });
    }
  };

  const openPopup = (id) => {
    axios(apiurl + "?i=" + id + apikey).then(({ data }) => {
      let result = data;
      console.log(result);
      setState((prevState) => {
        return {
          ...prevState,
          selected: result,
        };
      });
    });
  };
  const closePopup = () => {
    setState((prevState) => {
      return {
        ...prevState,
        selected: {},
      };
    });
  };
  return (
    <div className="App">
      <header>
        <h1>Movie Database App</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />

        <Results results={state.results} openPopup={openPopup} />

        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
};

export default App;
