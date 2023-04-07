import React from "react";
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../src/App';
import { DataTestId } from "../src/constants/DataTestId";

const mockCharacter = [{
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
        "name": "Earth (C-137)",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
        "name": "Citadel of Ricks",
        "url": "https://rickandmortyapi.com/api/location/3"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
        "https://rickandmortyapi.com/api/episode/1",
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
}];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

afterEach(() => jest.clearAllMocks());

test('Loading case', async () => {

    const renderComponent = () => (render(
        <Provider store={mockStore({
            characters: {
                pending: true,
                characters: [],
                error: null
            },
        })}>
            <App />
        </Provider>));

    const { getByTestId } = renderComponent();

    const loading = await waitFor(() => getByTestId(DataTestId.LOADING));
    expect(loading).toBeInTheDocument();
});

test('Search for a character', async () => {

    const searchText = "Rick";
    const renderComponent = () => (render(
        <Provider store={mockStore({
            characters: {
                pending: false,
                characters: mockCharacter,
                error: null
            },
        })}>
            <App />
        </Provider>));

    const { getAllByTestId, getByTestId } = renderComponent();

    fireEvent.change(getByTestId(DataTestId.SEARCH), {
        target: { value: searchText },
    });

    const characterSuggestions = await waitFor(() => getAllByTestId(DataTestId.NAME));
    expect(characterSuggestions[0].innerHTML).toContain(mockCharacter[0].name);
});


test('Error case', async () => {

    const renderComponent = () => (render(
        <Provider store={mockStore({
            characters: {
                pending: false,
                characters: [],
                error: true,
            },
        })}>
            <App />
        </Provider>));

    const { getByTestId } = renderComponent();

    const error = await waitFor(() => getByTestId(DataTestId.ERROR));
    expect(error).toBeInTheDocument();
});


test('Navigate to Character Detail successfully', async () => {

    const searchText = "Rick";
    const renderComponent = () => (render(
        <Provider store={mockStore({
            characters: {
                pending: false,
                characters: mockCharacter,
                error: null,
                selectedCharacterPending: false,
                selectedCharacter: mockCharacter[0],
                selectedCharacterError: null,
            },
            location: {
                pending: false,
                location: {},
                error: null
            }
        })}>
            <App />
        </Provider>));

    const { getAllByTestId, getByTestId, getByText } = renderComponent();

    fireEvent.change(getByTestId(DataTestId.SEARCH), {
        target: { value: searchText },
    });

    const characterSuggestions = await waitFor(() => getAllByTestId(DataTestId.NAME));
    expect(characterSuggestions[0].innerHTML).toContain(mockCharacter[0].name);

    fireEvent.click(getAllByTestId(DataTestId.NAVIGATE_CHARACTER_DETAIL)[0]);
    const characterDetailHeader = await waitFor(() => getByText("Character Detail"));

    expect(characterDetailHeader).toBeInTheDocument();

    // const mealListName = await waitFor(() => getByTestId(DataTestId.MEAL_LIST_NAME));
    // expect(mealListName).toBeInTheDocument();

    // fireEvent.click(getAllByTestId(DataTestId.NAVIGATE_CHARACTER_DETAIL)[0]);
    // const mealDetailHeader = await waitFor(() => getByText("Meal Detail"));
    // expect(mealDetailHeader).toBeInTheDocument();
});