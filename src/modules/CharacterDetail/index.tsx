import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { AppState } from "../../store/rootReducer";
import { CharactersState, Episode } from "../../store/characters/types";
import { LocationState } from "../../store/location/types";
import { fetchCharacterById, fetchMultipleEpisodes } from "../../store/characters/actions";
import { fetchSingleLocation } from "../../store/location/actions";
import Icon from "../../components/Icon";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

interface DispatchProps {
    fetchCharacterById: (id: string) => Promise<void>;
    fetchSingleLocation: (urlLocation: string) => Promise<void>;
    fetchMultipleEpisodes: (episodes: string) => Promise<void>;
}

interface StateProps {
    charactersState: CharactersState;
    locationState: LocationState;
}

type CharacterDetailProps = DispatchProps & StateProps;

const CharacterDetail: React.FunctionComponent<CharacterDetailProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { fetchCharacterById, fetchSingleLocation, fetchMultipleEpisodes, charactersState, locationState } = props;

    const { selectedCharacterPending, selectedCharacter, selectedCharacterError, episodesPending, episodes, episodesError } = charactersState;
    const { pending: locationPending, error: locationError, location: characterLocation } = locationState;

    const isError = !selectedCharacterPending && selectedCharacterError;
    const isNoContent = !selectedCharacterPending && !selectedCharacterError && isEmpty(selectedCharacter);

    const isLocationError = !locationPending && locationError;
    const isLocationNoContent = !locationPending && !locationError && isEmpty(characterLocation);

    const isEpisodesError = !episodesPending && episodesError;
    const isEpisodesNoContent = !episodesPending && !episodesError && isEmpty(episodes);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id") || "";

        fetchCharacterById(id);
    }, [location, fetchCharacterById]);

    useEffect(() => {
        if (!isEmpty(selectedCharacter)) {
            const { location, episode } = selectedCharacter;
            const { url } = location;
            const episodes = getEpisodes(episode);

            fetchSingleLocation(url);
            fetchMultipleEpisodes(episodes);
        }
    }, [selectedCharacter, fetchSingleLocation, fetchMultipleEpisodes]);

    const getEpisodes = (episode: string[]) => {
        let episodeIds = "";

        episode.map((episodeStr) => {
            const splittedEpisode = episodeStr.split("/");
            const episodeId = splittedEpisode[splittedEpisode.length - 1];
            episodeIds = episodeIds + episodeId + ",";
        });

        return episodeIds.slice(0, -1);
    }

    return <>
        <span className="navigation-back" onClick={() => { navigate(-1) }}>Back to Search</span>
        <h2>Character Detail</h2>
        {selectedCharacterPending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(selectedCharacter) &&
            <>
                <div className="character-detail__section">
                    {selectedCharacter.name.length !== 0 && <h2>{selectedCharacter.name}</h2>}
                    <div className="character-detail__information-wrapper">
                        {selectedCharacter.image && <div className="character-detail__image">
                            <img src={selectedCharacter.image} />
                        </div>}
                        <div className="character-detail__information-details">
                            <CharacterInformationItem title="Status" informationValue={selectedCharacter.status} />
                            <CharacterInformationItem title="Species" informationValue={selectedCharacter.species} />
                            <CharacterInformationItem title="Gender" informationValue={selectedCharacter.gender} />
                        </div>
                    </div>
                </div>
                <div className="character-detail__section">
                    <div className="character-detail__header">
                        <Icon iconClassName="character-detail__icon" iconName="place" />
                        <h2>Origin and location</h2>
                    </div>
                    {locationPending && <Loading />}
                    {isLocationError && <Error size={ErrorSize.lg} message="There is an error!" />}
                    {isLocationNoContent && <NoContent message="No data found :(" />}
                    {!isEmpty(characterLocation) &&
                        <div className="character-detail__location-details">
                            <CharacterInformationItem title="Name" informationValue={characterLocation.name} />
                            <CharacterInformationItem title="Type" informationValue={characterLocation.type} />
                            <CharacterInformationItem title="Dimension" informationValue={characterLocation.dimension} />
                            <CharacterInformationItem title="Number of residents" informationValue={characterLocation.residents.length} />
                        </div>
                    }
                </div>
                <div className="character-detail__section">
                    <div className="character-detail__header">
                        <Icon iconClassName="character-detail__icon" iconName="play_circle" />
                        <h2>Name of the chapters</h2>
                    </div>
                    {episodesPending && <Loading />}
                    {isEpisodesError && <Error size={ErrorSize.lg} message="There is an error!" />}
                    {isEpisodesNoContent && <NoContent message="No data found :(" />}
                    {!isEmpty(episodes) &&
                        <div className="character-detail__episodes-wrapper">
                            {episodes.map((episode: Episode) => <EpisodeInformationItem key={`episode-item-${episode.id}`} episode={episode} />)}
                        </div>}
                </div>
            </>}
    </>;
}

const CharacterInformationItem = (props: { title: string, informationValue: string | number }) => {
    const { title, informationValue } = props;

    return <>
        <span className="character-detail__information-title">{title}</span>
        <span>{informationValue}</span>
    </>
}

const EpisodeInformationItem = (props: { episode: Episode }) => {
    const { episode } = props;

    return <div className="character-detail__episode-item">{`${episode.name} (${episode.episode})`}</div>;
};

const mapStateToProps = (state: AppState) => {
    return {
        charactersState: state.characters,
        locationState: state.location
    }
}

const mapDispatchToProps = {
    fetchCharacterById,
    fetchSingleLocation,
    fetchMultipleEpisodes
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);