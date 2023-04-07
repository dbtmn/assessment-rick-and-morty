import {
    FETCH_CHARACTERS_BY_NAME_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE,
    FETCH_CHARACTER_DETAIL_REQUEST,
    FETCH_CHARACTER_DETAIL_SUCCESS,
    FETCH_CHARACTER_DETAIL_FAILURE,
    FETCH_MULTIPLE_EPISODES_REQUEST,
    FETCH_MULTIPLE_EPISODES_SUCCESS,
    FETCH_MULTIPLE_EPISODES_FAILURE
} from "./actionTypes";

import { Character, CharactersActions, CharactersState } from "./types";

const initialState: CharactersState = {
    pending: false,
    characters: [],
    error: null,
    selectedCharacterPending: false,
    selectedCharacter: {} as Character,
    selectedCharacterError: null,
    episodesPending: false,
    episodes: [],
    episodesError: null
};

const charactersReducer = (state = initialState, action: CharactersActions) => {
    switch (action.type) {
        case FETCH_CHARACTER_DETAIL_REQUEST:
            return {
                ...state,
                selectedCharacterPending: true,
            };
        case FETCH_CHARACTER_DETAIL_SUCCESS:
            return {
                ...state,
                selectedCharacterPending: false,
                selectedCharacter: action.payload.selectedCharacter,
                selectedCharacterError: null,
            };
        case FETCH_CHARACTER_DETAIL_FAILURE:
            return {
                ...state,
                selectedCharacterPending: false,
                selectedCharacter: null,
                selectedCharacterError: action.payload.selectedCharacterError,
            };
        case FETCH_MULTIPLE_EPISODES_REQUEST:
            return {
                ...state,
                episodesPending: true
            };
        case FETCH_MULTIPLE_EPISODES_SUCCESS:
            return {
                ...state,
                episodesPending: false,
                episodes: action.payload.episodes,
                episodesError: null,
            };
        case FETCH_MULTIPLE_EPISODES_FAILURE:
            return {
                ...state,
                episodesPending: false,
                episodes: [],
                episodesError: action.payload.episodesError,
            };
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