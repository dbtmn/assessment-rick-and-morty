import { combineReducers } from "redux";
// import charactersReducer from "./characters/reducer";

const rootReducer = combineReducers({
    // characters: charactersReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;