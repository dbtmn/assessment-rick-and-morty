import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { AppState } from "../../store/rootReducer";
import { CharactersState } from "../../store/characters/types";
import { LocationState } from "../../store/location/types";
import { fetchCharacterById, fetchMultipleEpisodes } from "../../store/characters/actions";
import { fetchSingleLocation } from "../../store/location/actions";
import Icon from "../../components/Icon";
import Loading from "../../components/Loading";
import CharacterInformation from "../../shared/CharacterInformation";
import EpisodesInformation from "../../shared/EpisodesInformation";
import Error, { ErrorSize } from "../../shared/Error";
import LocationInformation from "../../shared/LocationInformation";
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

    const isError = !selectedCharacterPending && selectedCharacterError;
    const isNoContent = !selectedCharacterPending && !selectedCharacterError && isEmpty(selectedCharacter);

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
        <div className="character-detail__back">
            <Icon iconClassName="character-detail__back-icon" iconName="arrow_back" />
            <span className="navigation-back" onClick={() => { navigate(-1) }}>Back to Search</span>
        </div>
        <h2>Character Detail</h2>
        {selectedCharacterPending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(selectedCharacter) &&
            <>
                <div className="character-detail__section">
                    <CharacterInformation selectedCharacter={selectedCharacter} />
                </div>
                <div className="character-detail__section">
                    <LocationInformation locationState={locationState} />
                </div>
                <div className="character-detail__section">
                    <EpisodesInformation pending={episodesPending} episodes={episodes} error={episodesError} />
                </div>
            </>}
    </>;
}

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