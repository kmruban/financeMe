import { createContext, useReducer } from "react";

export const Context = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
