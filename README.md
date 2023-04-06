# Implementation of a Rick and Morty list application by Dila ONGUN

This app is created via [Create React App](https://create-react-app.dev/).
Shows a list of Rick and Morty characters.

# Requirements

To run this project manually, you need Node.js installed on your environment. It also includes npm.
To check if they are installed on your environment, run and see available version successfully:

    $ node --version

    $ npm --version

# Start

To start the app, run the following commands:

    $ npm install

    $ npm run start

# Test

To test the app, run the following command:

    $ npm run test

## Languages & Tools

### JavaScript

- [React](http://facebook.github.io/react) is used as framework.

### TypeScript

- [TypeScript](https://www.typescriptlang.org/) is used.

### Eslint

- [Eslint](https://eslint.org/) is used to support code quality.

### Redux DevTools

- [Redux DevTool](https://github.com/reduxjs/redux-devtools) is used to monitor Redux activities easily over browser.

### CSS

- [SCSS](https://sass-lang.com/) is used for styling.
- [Material-UI](https://mui.com/) is used for some of the UI components.
- [Google Fonts](https://fonts.google.com/) and [Google Icons](https://fonts.google.com/icons) are used for font and icons.

### State Management

- [Redux](https://redux.js.org/) is used for state management.

### Page Routing

- [React Router](https://reactrouter.com/) is used for page routing.

### Responsiveness

- To provide responsiveness, [grid](https://mui.com/material-ui/react-grid/) component of Material-UI is preferred and supported with media query.

### Build

- [Webpack](https://webpack.js.org/) is used as build tool.

### Compiler

- [Babel](https://babeljs.io/) is used as compiler.

### Test

- [React Testing Library](https://testing-library.com/) and [Jest](https://jestjs.io/) are used for testing purposes.
- [Redux mock store](https://github.com/reduxjs/redux-mock-store) is used to create a mock Redux store.

# Further Improvements

- Additional eslint configurations might be useful in future.

# About Structure

My main concerns are readability, maintainability, reusability, clean code.

To provide these concerns, it is preferred a structure via folders:

- tests: Tests
- api: API requests
- components: Base helper components
- constants: Constants
- modules: Pages
- scss: Css utilities
- shared: Components that are used in modules
- store: Redux files

For CSS classNames, BEM naming convention is preferred.

All implementation assumes this application gets bigger. So, I focused on splitting everything into pieces.


# About features

