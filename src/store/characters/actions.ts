import { AxiosError } from "axios";
import { getCharactersByName, getCharacterById } from "../../api";

import { DispatchCharactersType, FetchCharactersByNameRequest, FetchCharacterDetailRequest, FetchCharactersSuccessPayload, FetchCharacterDetailSuccessPayload, FetchCharacterDetailFailurePayload, FetchCharactersFailurePayload, FetchCharactersSuccess, FetchCharacterDetailSuccess, FetchCharactersFailure, FetchCharacterDetailFailure } from "./types";
import { FETCH_CHARACTERS_BY_NAME_REQUEST, FETCH_CHARACTER_DETAIL_REQUEST, FETCH_CHARACTER_DETAIL_SUCCESS, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_FAILURE, FETCH_CHARACTER_DETAIL_FAILURE } from "./actionTypes";

export const fetchCharactersByName = (searchName: string) => async (dispatch: DispatchCharactersType) => {
    try {
        dispatch(fetchCharactersByNameRequest());
        return getCharactersByName(searchName)
            .then((result) => {
                dispatch(fetchCharactersSuccess({ characters: result.data.results || [] }));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    dispatch(fetchCharactersSuccess({ characters: [] }));
                }

            });
    } catch (err) {
        dispatch(fetchCharactersFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchCharacterById = (id: string) => async (dispatch: DispatchCharactersType) => {
    try {
        dispatch(fetchCharacterDetailRequest());
        return getCharacterById(id).then((result) => {
            const selectedCharacterResult = result.data.hasOwnProperty("info") ? [] : result.data;
            dispatch(fetchCharacterDetailSuccess({ selectedCharacter: selectedCharacterResult }));
        });
    } catch (err) {
        dispatch(fetchCharacterDetailFailure({ selectedCharacterError: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchCharactersByNameRequest = (): FetchCharactersByNameRequest => ({
    type: FETCH_CHARACTERS_BY_NAME_REQUEST,
});

export const fetchCharacterDetailRequest = (): FetchCharacterDetailRequest => ({
    type: FETCH_CHARACTER_DETAIL_REQUEST,
});

export const fetchCharactersSuccess = (
    payload: FetchCharactersSuccessPayload
): FetchCharactersSuccess => ({
    type: FETCH_CHARACTERS_SUCCESS,
    payload,
});

export const fetchCharacterDetailSuccess = (
    payload: FetchCharacterDetailSuccessPayload
): FetchCharacterDetailSuccess => ({
    type: FETCH_CHARACTER_DETAIL_SUCCESS,
    payload,
});

export const fetchCharacterDetailFailure = (
    payload: FetchCharacterDetailFailurePayload
): FetchCharacterDetailFailure => ({
    type: FETCH_CHARACTER_DETAIL_FAILURE,
    payload,
});

export const fetchCharactersFailure = (
    payload: FetchCharactersFailurePayload
): FetchCharactersFailure => ({
    type: FETCH_CHARACTERS_FAILURE,
    payload,
});