import React from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { AppState } from "../../store/rootReducer";
import { fetchCharactersByName } from "../../store/characters/actions";
import { CharactersState } from "../../store/characters/types";
import mainLogo from '../../../public/rick-and-morty-top-banner.png';
import Loading from "../../components/Loading";
import SearchBox from "../../components/SearchBox";
import Error, { ErrorSize } from "../../shared/Error";

import "./index.scss";

interface DispatchProps {
    fetchCharactersByName: (searchName: string) => Promise<void>;
}

interface StateProps {
    charactersState: CharactersState;
}

type DashboardProps = DispatchProps & StateProps;

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {
    const { fetchCharactersByName, charactersState } = props;
    const { error, pending, characters } = charactersState;

    const isError = !pending && error;

    const searchCharactersByName = (value: string) => {
        searchDebounced(value);
    };

    const searchDebounced = debounce(function (value) {
        if (value.length !== 0) {
            fetchCharactersByName(value);
        }
    }, 500);

    return <>
        <img className="dashboard__banner" src={mainLogo} alt="rickMortyBanner"/>
        <SearchBox
            className="dashboard__searchbox"
            searchResult={characters}
            onChange={(value) => searchCharactersByName(value)} />
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {
        charactersState: state.characters,
    }
}

const mapDispatchToProps = {
    fetchCharactersByName
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);