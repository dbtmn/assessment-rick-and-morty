import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { AppState } from "../../store/rootReducer";
import { CharactersState } from "../../store/characters/types";
import { LocationState } from "../../store/location/types";
import { fetchCharacterById } from "../../store/characters/actions";
import { fetchSingleLocation } from "../../store/location/actions";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

interface DispatchProps {
    fetchCharacterById: (id: string) => Promise<void>;
    fetchSingleLocation: (urlLocation: string) => Promise<void>;
}

interface StateProps {
    charactersState: CharactersState;
    locationState: LocationState;
}

type CharacterDetailProps = DispatchProps & StateProps;

const CharacterDetail: React.FunctionComponent<CharacterDetailProps> = (props) => {
    const location = useLocation();

    const { fetchCharacterById, fetchSingleLocation, charactersState, locationState } = props;

    const { selectedCharacterPending, selectedCharacter, selectedCharacterError } = charactersState;
    const { pending: locationPending, error: locationError, location: characterLocation } = locationState;

    const isError = !selectedCharacterPending && selectedCharacterError;
    const isNoContent = !selectedCharacterPending && !selectedCharacterError && isEmpty(selectedCharacter);

    const isLocationError = !locationPending && locationError;
    const isLocationNoContent = !locationPending && !locationError && isEmpty(characterLocation);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get("id") || "";

        fetchCharacterById(id);
    }, [location, fetchCharacterById]);

    useEffect(() => {
        if (!isEmpty(selectedCharacter)) {
            const { location } = selectedCharacter;
            const { url } = location;

            fetchSingleLocation(url);
        }
    }, [selectedCharacter, fetchSingleLocation]);

    return <>
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
                    <h2>Origin and location</h2>
                    {locationPending && <Loading />}
                    {isLocationError && <Error size={ErrorSize.lg} message="There is an error!" />}
                    {isLocationNoContent && <NoContent message="No data found :(" />}
                    {!isEmpty(characterLocation) && <div>{characterLocation.name}</div>}
                </div>
                <div className="character-detail__section">Name of the chapters</div>
            </>}
    </>;
}

const CharacterInformationItem = (props: { title: string, informationValue: string }) => {
    const { title, informationValue } = props;

    return <>
        <span className="character-detail__information-title">{title}</span>
        <span>{informationValue}</span>
    </>
}

const mapStateToProps = (state: AppState) => {
    return {
        charactersState: state.characters,
        locationState: state.location
    }
}

const mapDispatchToProps = {
    fetchCharacterById,
    fetchSingleLocation
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);