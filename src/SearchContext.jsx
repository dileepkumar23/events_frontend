import { createContext } from "react";
import { useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [userInput, setUserInput] = useState("")

    return(
        <SearchContext.Provider value={{userInput, setUserInput}}>
            {children}
        </SearchContext.Provider>
    )
}

