/* eslint-disable */
import { useReducer ,useEffect} from "react";
import axios from "axios";
import ShowsContext from "./showsContext";
import ShowsReducer from "./showsReducer";
import {
  SEARCH_SHOWS,
  SET_LOADING,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
  GET_ALL_SHOWS,
  TOGGLE_THEME,
  INIT_AUTH_FAVORITE,
  REMOVE_FROM_FAVORITES,
  ADD_TO_FAVORITES,
  LOGOUT,
  LOGIN

} from "../types";

const ShowsState = (props) => {
  
  const initialState = {
    shows: [],
    singleShow: {},
    allUsers: localStorage.getItem("allUsers")
      ? JSON.parse(localStorage.getItem("allUsers"))
      : [],
    auth: localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : [],
    favorite: localStorage.getItem("favorite")
      ? JSON.parse(localStorage.getItem("favorite"))
      : [], 
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

  const initAuthFavorite = () => {
    try {
      const authData = localStorage.getItem("auth");
      const favoriteData = localStorage.getItem("favorite");
      const allUsersData = localStorage.getItem("allUsers");
  
      const auth = authData ? JSON.parse(authData) : [];
      const favorite = favoriteData ? JSON.parse(favoriteData) : [];
      const allUsers = allUsersData ? JSON.parse(allUsersData) : [];
  
      dispatch({
        type: INIT_AUTH_FAVORITE,
        payload: { auth, favorite, allUsers },
      });
    } catch (error) {
      console.error("Error parsing local storage data:", error);
      // Handle the error gracefully, set default values, or take appropriate action
      const defaultData = { auth: [], favorite: [], allUsers: [] };
      dispatch({
        type: INIT_AUTH_FAVORITE,
        payload: defaultData,
      });
    }
  };
  
  const addToFavorites = (newFavorite) => {
    dispatch({
      type: ADD_TO_FAVORITES,
      payload: newFavorite,
    });
  };

  const removeFromFavorites = (showId) => {
    dispatch({
      type: REMOVE_FROM_FAVORITES,
      payload: showId,
    });
  };

  const login = (userData) => {
    dispatch({
      type: LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };
  useEffect(() => {
    initAuthFavorite(); // Initialize auth and favorite on component mount
  }, []);
  return (
    <ShowsContext.Provider
      value={{
        shows: state.shows,
        singleShow: state.singleShow,
        loading: state.loading,
        darkMode: state.darkMode, 
        allUsers: state.allUsers,
        auth: state.auth,
        favorite: state.favorite,
        searchShows,
        getSingleShow,
        clearSingleShow,
        getAllShows,
        toggleTheme, 
        initAuthFavorite,
        addToFavorites,
        removeFromFavorites,
        login,
        logout,

      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsState;
