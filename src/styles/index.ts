import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// For Mansory Grid
export const GridContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  height: 100vh;
  padding-top: 40px;
`;

export const PhotoItem = styled.div`
  padding: 10px;
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #555;
`;

// General
export const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #ff0000;
  background-color: #ffeeee;
  border-radius: 8px;
  margin-top: 20px;
`;

// For PhotoDetails Component
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Image = styled.img`
  max-height: 400px;
  max-width: 100%;
  height: auto;
`;

export const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 20px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

// For SearchBar

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 55%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;
