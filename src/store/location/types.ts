import { FETCH_SINGLE_LOCATION_REQUEST, FETCH_SINGLE_LOCATION_SUCCESS, FETCH_SINGLE_LOCATION_FAILURE } from "./actionTypes";

export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
}

export interface LocationState {
    pending: boolean;
    location: Location;
    error: string | null;
}

export interface FetchSingleLocationRequest {
    type: typeof FETCH_SINGLE_LOCATION_REQUEST;
};

export interface FetchSingleLocationSuccessPayload {
    location: Location;
}

export interface FetchSingleLocationFailurePayload {
    error: string;
}

export type FetchSingleLocationSuccess = {
    type: typeof FETCH_SINGLE_LOCATION_SUCCESS;
    payload: FetchSingleLocationSuccessPayload;
};

export type FetchSingleLocationFailure = {
    type: typeof FETCH_SINGLE_LOCATION_FAILURE;
    payload: FetchSingleLocationFailurePayload;
};

export type DispatchLocationType = (args?: LocationActions) => void;

export type LocationActions =
| FetchSingleLocationRequest
| FetchSingleLocationSuccess
| FetchSingleLocationFailure;