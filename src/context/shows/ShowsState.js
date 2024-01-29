import { useReducer, useEffect } from "react";
import axios from "axios";
import ShowsContext from "./showsContext";
import ShowsReducer from "./showsReducer";
import {
  SEARCH_SHOWS,
  SET_LOADING,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
  GET_ALL_SHOWS,
  TOGGLE_THEME
} from "../types";

const ShowsState = (props) => {
  const initialState = {
    // allShows:[],
    shows: [],
    singleShow: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(ShowsReducer, initialState);

  const getAllShows = async () => {
    dispatch({ type: SET_LOADING });

    try {
      const { data } = await axios.get("https://api.tvmaze.com/shows");

      dispatch({
        type: GET_ALL_SHOWS,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching all shows:", error);
      // Optionally dispatch an action for error handling
    }
  };

  const searchShows = async (searchTerm) => {
    dispatch({ type: SET_LOADING });
console.log("?????? search actions");
    try {
      const { data } = await axios.get(
        `https://api.tvmaze.com/search/shows?q=${searchTerm}`
      );

      dispatch({
        type: SEARCH_SHOWS,
        payload: data,
      });
    } catch (error) {
      console.error("Error searching shows:", error);
      // Optionally dispatch an action for error handling
    }
  };

  const getSingleShow = async (id) => {
    dispatch({
      type: SET_LOADING,
    });

    try {
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);

      dispatch({
        type: SET_SINGLE_SHOW,
        payload: data,
      });
    } catch (error) {
      console.error("Error fetching single show:", error);
      // Optionally dispatch an action for error handling
    }
  };

  const clearSingleShow = () => {
    dispatch({
      type: CLEAR_SINGLE_SHOW,
    });
  };

  const toggleTheme = () => {
    dispatch({
      type: TOGGLE_THEME,
    });
  };

  return (
    <ShowsContext.Provider
      value={{
        shows: state.shows,
        singleShow: state.singleShow,
        loading: state.loading,
        darkMode: state.darkMode, 

        searchShows,
        getSingleShow,
        clearSingleShow,
        getAllShows,
        toggleTheme, 

      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsState;
