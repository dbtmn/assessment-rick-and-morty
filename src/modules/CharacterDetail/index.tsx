import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { AppState } from "../../store/rootReducer";
import Icon from "../../components/Icon";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

interface DispatchProps {
}

interface StateProps {
}

type CharacterDetailProps = DispatchProps & StateProps;

const CharacterDetail: React.FunctionComponent<CharacterDetailProps> = (props) => {
    const location = useLocation();

    const isError = false;
    const isNoContent = false;
    const isPending = false;
    const selectedCharacter: any = []; /** TO-DO: Define */

    return <>
        <h2>Character Detail</h2>
        {isPending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(selectedCharacter) &&
            <>
                Design Placeholder
            </>
        }
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {

    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetail);