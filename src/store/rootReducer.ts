import { combineReducers } from "redux";
import charactersReducer from "./characters/reducer";
import locationReducer from "./location/reducer";

const rootReducer = combineReducers({
    characters: charactersReducer,
    location: locationReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;