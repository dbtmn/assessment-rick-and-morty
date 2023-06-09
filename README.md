# Implementation of a Rick and Morty list application by Dila ONGUN

This app is created via [Create React App](https://create-react-app.dev/).
Searches Rick and Morty characters.

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
- Additional features such as showing a list of favourite characters, filtering characters/locations.

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

To support clean code principle, I splitted the code and seperated into files when it starts to repeat. (for ex. CharacterInformationItem.tsx is a subcomponent in [CharacterInformation folder](https://github.com/dbtmn/assessment-rick-and-morty/tree/main/src/shared/CharacterInformation).)
If I assume there is no possibility that a subcomponent is used by other components, then I did not place in a seperate file. (for ex. [LocationInformationItem](https://github.com/dbtmn/assessment-rick-and-morty/blob/dbf06d7d03a0ac289b61b57bcf1af015722d7922/src/shared/LocationInformation/index.tsx#L39) in shared/LocationInformation folder)

# About features

User has ability to access two different pages. <br /> User accesses Dashboard page as home page. In Dashboard page:
- A banner image and a search box is available.
- User searches a character by name.
    - First 5 suggestions are visible.
    - The first suggestion is visible inside of the search box.
    - Suggestions are shown under the search box.
    - If user clicks outside of the suggestions, suggestions are closed.
    - Live search is performed in each 500 ms.
    - If user presses right arrow button, suggested word is searched.
- User clicks one of the suggestions and user is navigated to Character Detail page. <br />

In Character Detail page: <br />
There are details of the character. <br />
- On the top, there are details such as status, species, gender and an image of the character.
- In the middle, there are details such as origin, location, dimension, number of residents.
- At the bottom, there are chapters the character is featured on.

For both of the pages, error and loading designs are available.
