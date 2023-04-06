import { AxiosError } from "axios";
import { getCharactersByName } from "../../api";

import { DispatchCharactersType, FetchCharactersByNameRequest, FetchCharactersSuccessPayload, FetchCharactersFailurePayload, FetchCharactersSuccess, FetchCharactersFailure } from "./types";
import { FETCH_CHARACTERS_BY_NAME_REQUEST, FETCH_CHARACTERS_SUCCESS, FETCH_CHARACTERS_FAILURE } from "./actionTypes";

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

export const fetchCharactersByNameRequest = (): FetchCharactersByNameRequest => ({
    type: FETCH_CHARACTERS_BY_NAME_REQUEST,
});

export const fetchCharactersSuccess = (
    payload: FetchCharactersSuccessPayload
): FetchCharactersSuccess => ({
    type: FETCH_CHARACTERS_SUCCESS,
    payload,
});

export const fetchCharactersFailure = (
    payload: FetchCharactersFailurePayload
): FetchCharactersFailure => ({
    type: FETCH_CHARACTERS_FAILURE,
    payload,
});