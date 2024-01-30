import {
  SEARCH_SHOWS,
  SET_LOADING,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
  GET_ALL_SHOWS,
  TOGGLE_THEME,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  LOGOUT,
  LOGIN
} from "../types";

const showsReducer = (state, action) => {

  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
      case GET_ALL_SHOWS: 
      return {
        ...state,
        shows: action.payload,
        loading: false,
      };
    case SEARCH_SHOWS:
      return {
        ...state,
        shows: action.payload,
        loading: false,
      };
    case SET_SINGLE_SHOW:
      return {
        ...state,
        singleShow: action.payload,
        loading: false,
      };
    case CLEAR_SINGLE_SHOW:
      return {
        ...state,
        singleShow: {},
      };

      case TOGGLE_THEME:
        return {
          ...state,
          darkMode: !state.darkMode,
        };

        case ADD_TO_FAVORITES:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorite: state.favorite.filter((show) => show.id !== action.payload),
      };
      case LOGIN:
      return {
        ...state,
        auth: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        auth: [],
      };
    
    default:
      return state;
  }
};

export default showsReducer;
