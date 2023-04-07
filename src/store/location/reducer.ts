import {
    FETCH_SINGLE_LOCATION_REQUEST,
    FETCH_SINGLE_LOCATION_SUCCESS,
    FETCH_SINGLE_LOCATION_FAILURE
} from "./actionTypes";

import { Location, LocationActions, LocationState } from "./types";

const initialState: LocationState = {
    pending: false,
    location: {} as Location,
    error: null
};

const locationReducer = (state = initialState, action: LocationActions) => {
    switch (action.type) {
        case FETCH_SINGLE_LOCATION_REQUEST:
            return {
                ...state,
                pending: true,
            };
        case FETCH_SINGLE_LOCATION_SUCCESS:
            return {
                ...state,
                pending: false,
                location: action.payload.location,
                error: null,
            };
        case FETCH_SINGLE_LOCATION_FAILURE:
            return {
                ...state,
                pending: false,
                location: null,
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};

export default locationReducer;