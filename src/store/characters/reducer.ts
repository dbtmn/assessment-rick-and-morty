import {
    FETCH_CHARACTERS_BY_NAME_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE
} from "./actionTypes";

import { CharactersActions, CharactersState } from "./types";

const initialState: CharactersState = {
    pending: false,
    characters: [],
    error: null
};

const charactersReducer = (state = initialState, action: CharactersActions) => {
    switch (action.type) {
        case FETCH_CHARACTERS_BY_NAME_REQUEST:
            return {
                ...state,
                pending: true,
                characters: []
            };
        case FETCH_CHARACTERS_SUCCESS:
            return {
                ...state,
                pending: false,
                characters: action.payload.characters || [],
                error: null,
            };
        case FETCH_CHARACTERS_FAILURE:
            return {
                ...state,
                pending: false,
                characters: [],
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export default charactersReducer;