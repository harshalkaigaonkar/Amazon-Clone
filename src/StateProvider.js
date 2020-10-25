import React, { createContext, useContext, useReducer } from 'react';

// Prepares data Layer
export const StateContext = createContext();

//Wrap ur app and Provides data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider
        value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//pull information from data layer
export const useStateValue = () => useContext(StateContext);