import { FETCH_CHARACTERS_BY_NAME_REQUEST, FETCH_CHARACTER_DETAIL_REQUEST, FETCH_CHARACTER_DETAIL_SUCCESS, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTER_DETAIL_FAILURE, FETCH_CHARACTERS_FAILURE } from "./actionTypes";

export interface Origin {
    name: string;
    url: string
}

export interface Location {
    name: string;
    url: string
}

export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    url: string;
}

export interface CharactersState {
    pending: boolean;
    characters: Character[];
    error: string | null;
    selectedCharacterPending: boolean;
    selectedCharacter: Character;
    selectedCharacterError: string | null;
}

export interface FetchCharactersByNameRequest {
    type: typeof FETCH_CHARACTERS_BY_NAME_REQUEST;
};

export interface FetchCharacterDetailRequest {
    type: typeof FETCH_CHARACTER_DETAIL_REQUEST;
}

export interface FetchCharactersSuccessPayload {
    characters: Character[];
}

export interface FetchCharacterDetailSuccessPayload {
    selectedCharacter: Character;
}

export interface FetchCharactersFailurePayload {
    error: string;
}
export interface FetchCharacterDetailFailurePayload {
    selectedCharacterError: string;
}

export type FetchCharacterDetailSuccess = {
    type: typeof FETCH_CHARACTER_DETAIL_SUCCESS;
    payload: FetchCharacterDetailSuccessPayload;
};

export type FetchCharactersSuccess = {
    type: typeof FETCH_CHARACTERS_SUCCESS;
    payload: FetchCharactersSuccessPayload;
};

export type FetchCharactersFailure = {
    type: typeof FETCH_CHARACTERS_FAILURE;
    payload: FetchCharactersFailurePayload;
};

export type FetchCharacterDetailFailure = {
    type: typeof FETCH_CHARACTER_DETAIL_FAILURE;
    payload: FetchCharacterDetailFailurePayload;
};

export type DispatchCharactersType = (args?: CharactersActions) => void;

export type CharactersActions =
| FetchCharactersByNameRequest
| FetchCharacterDetailRequest
| FetchCharacterDetailSuccess
| FetchCharactersSuccess
| FetchCharactersFailure
| FetchCharacterDetailFailure;