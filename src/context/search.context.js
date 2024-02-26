import { useState, createContext } from "react";

const SearchContext = createContext();

const SearchProviderWrapper = (props) => {
  const [filter, setFilter] = useState("");

  return (
    <SearchContext.Provider value={{ filter, setFilter }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchProviderWrapper, SearchContext };
