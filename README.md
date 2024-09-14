# Deel Frontend Challenge 

A React application to create a virtualized grid


## Tools

- [React](https://reactjs.org/)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [React testing library](https://testing-library.com/docs/react-testing-library/intro/)
- [Styled Component](https://styled-components.com/)
- [Faker](https://www.npmjs.com/package/@faker-js/faker)
- [EsLint](https://www.npmjs.com/package/eslint)
- [React-window](https://www.npmjs.com/package/react-window)
- [react-virtualized-auto-sizer](https://www.npmjs.com/package/react-virtualized-auto-sizer)
- [unsplash.js](https://github.com/unsplash/unsplash-js)

## Prerequisites

The following should be installed in your machine

- Node v20.12.2 and above

## How To Install And Run The Application on local

- clone git repo
- rename .env.example to .env add your access key to REACT_APP_UNSPLASH_ACCESS_KEY=
- Install all the dependancies by running the `npm install`
- Start the application on development mode by running `npm start`
- Run tests by running `npm test`
- The tests are in the src/___tests___ folder

## How I ensured performance
1. By using React.lazy to lazy load component
2. By properly logging and display errors
3. By use useCallback and React.memo where necessary
4. By using appropriate library to ensure virtualization of the grid

## Issues

Issues are always very welcome. Please be sure to create a constructive issue when neccessary.
