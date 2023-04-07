import { AxiosError } from "axios";
import { getSingleLocation } from "../../api";

import { DispatchLocationType, FetchSingleLocationRequest, FetchSingleLocationSuccessPayload, FetchSingleLocationFailurePayload, FetchSingleLocationSuccess, FetchSingleLocationFailure } from "./types";
import { FETCH_SINGLE_LOCATION_REQUEST, FETCH_SINGLE_LOCATION_SUCCESS, FETCH_SINGLE_LOCATION_FAILURE } from "./actionTypes";

export const fetchSingleLocation = (urlLocation: string) => async (dispatch: DispatchLocationType) => {
    try {
        dispatch(fetchSingleLocationRequest());
        return getSingleLocation(urlLocation).then((result) => {
            const locationResult = result.data.hasOwnProperty("info") ? [] : result.data;
            dispatch(fetchSingleLocationSuccess({ location: locationResult }));
        });
    } catch (err) {
        dispatch(fetchSingleLocationFailure({ error: (err as AxiosError).message }));
        return Promise.reject(err);
    }
};

export const fetchSingleLocationRequest = (): FetchSingleLocationRequest => ({
    type: FETCH_SINGLE_LOCATION_REQUEST,
});

export const fetchSingleLocationSuccess = (
    payload: FetchSingleLocationSuccessPayload
): FetchSingleLocationSuccess => ({
    type: FETCH_SINGLE_LOCATION_SUCCESS,
    payload,
});

export const fetchSingleLocationFailure = (
    payload: FetchSingleLocationFailurePayload
): FetchSingleLocationFailure => ({
    type: FETCH_SINGLE_LOCATION_FAILURE,
    payload,
});