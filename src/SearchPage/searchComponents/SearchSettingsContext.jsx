import React from "react";

/**
 * creates a Context object using the skills array.
 */
export const initialState = {
    skills: []
};

export const SearchSettingsContext = React.createContext(initialState);
