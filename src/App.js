import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

const App = () => {
  const key = process.env.REACT_APP_IMDB_API_KEY;
  const apiurl = "http://www.omdbapi.com/";
  const apikey = `&apikey=${key}`;

  const [state, setState] = useState({
    results: [],
    selected: {},
  });

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    search(searchValue);
    // eslint-disable-next-line
  }, [searchValue]);

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const search = (value) => {
    axios
      .get(apiurl + "?s=" + value + apikey)
      .then(({ data }) => {
        let results = data.Search;
        // console.log(results);
        setState((prevState) => {
          return {
            ...prevState,
            results: results ? results : prevState.results,
          };
        });
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const openPopup = (id) => {
    axios(apiurl + "?i=" + id + apikey)
      .then(({ data }) => {
        let result = data;
        // console.log(result);
        setState((prevState) => {
          return {
            ...prevState,
            selected: result,
          };
        });
      })
      .catch((err) => {
        window.alert(err);
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
        <Search handleInput={handleInput} search={() => search(searchValue)} />

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
