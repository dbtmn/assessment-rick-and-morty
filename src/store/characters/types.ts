import { FETCH_CHARACTERS_BY_NAME_REQUEST, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_FAILURE } from "./actionTypes";

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
}

export interface FetchCharactersByNameRequest {
    type: typeof FETCH_CHARACTERS_BY_NAME_REQUEST;
};

export interface FetchCharactersSuccessPayload {
    characters: Character[];
}

export interface FetchCharactersFailurePayload {
    error: string;
}

export type FetchCharactersSuccess = {
    type: typeof FETCH_CHARACTERS_SUCCESS;
    payload: FetchCharactersSuccessPayload;
};

export type FetchCharactersFailure = {
    type: typeof FETCH_CHARACTERS_FAILURE;
    payload: FetchCharactersFailurePayload;
};

export type DispatchCharactersType = (args?: CharactersActions) => void;

export type CharactersActions =
| FetchCharactersByNameRequest
| FetchCharactersSuccess
| FetchCharactersFailure;