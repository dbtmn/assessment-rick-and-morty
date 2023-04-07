import axios from "axios";

export const getCharactersByName = async (searchName: string) => {
    const url = `https://rickandmortyapi.com/api/character/?name=${searchName}`;

    return axios.get(url);
}

export const getCharacterById = async (id: string) => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;

    return axios.get(url);
}

export const getSingleLocation = async (urlLocation: string) => {
    const url = `${urlLocation}`;

    return axios.get(url);
};

export const getMultipleEpisodes = async (episodes: string) => {
    const url = `https://rickandmortyapi.com/api/episode/${episodes}`;

    return axios.get(url);
};