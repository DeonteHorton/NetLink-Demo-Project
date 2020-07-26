import React, {createContext, useReducer} from 'react';
export const StateContext = createContext();
export const StateProvider = ({reducer, globalState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, globalState)}>
    {children}
  </StateContext.Provider>
);