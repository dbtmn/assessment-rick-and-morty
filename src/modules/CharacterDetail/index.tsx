import React from "react";
import { connect } from "react-redux";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

// interface DispatchProps {
// }

// interface StateProps {
// }

// type CharacterDetailProps = DispatchProps & StateProps;

const CharacterDetail: React.FunctionComponent/* <CharacterDetailProps> */ = () => {
    // const location = useLocation();

    const isError = false;
    const isNoContent = false;
    const isPending = false;

    return <>
        <h2>Character Detail</h2>
        {isPending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />}
    </>;
}

const mapDispatchToProps = {
};

export default connect(null, mapDispatchToProps)(CharacterDetail);