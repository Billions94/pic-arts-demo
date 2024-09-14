import React, { memo, useCallback } from "react";
import { SearchContainer, SearchInput, SearchButton } from "../styles";

interface SearchBarProps {
  handleSearch: (query: string) => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchInputBar: React.FC<SearchBarProps> = memo(
  ({ handleSearch, searchQuery, setSearchQuery }) => {
    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        handleSearch(searchQuery.trim());
      },
      [searchQuery, handleSearch]
    );

    const handleSearchInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      },
      [setSearchQuery]
    );

    return (
      <SearchContainer data-testid="search-input-bar">
        <form data-testid="search-form" onSubmit={handleSubmit}>
          <SearchInput
            data-testid="search-input"
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search for photos..."
            aria-label="Search input"
          />
          <SearchButton data-testid="search-button" type="submit">
            Search
          </SearchButton>
        </form>
      </SearchContainer>
    );
  }
);
