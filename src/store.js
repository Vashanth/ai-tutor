import { createStore } from "redux";

// Initial state
const initialState = {
  url: "",
};

const SET_URL = "SET_URL";

// Action creators
export const setUrl = (url) => ({ type: SET_URL, payload: url }); // New action creator for setting URL

// Reducer
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

// Create store
const store = createStore(counterReducer);

export default store;
