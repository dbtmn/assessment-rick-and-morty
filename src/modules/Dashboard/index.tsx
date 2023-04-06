import React, { useEffect } from "react";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import { AppState } from "../../store/rootReducer";
import Loading from "../../components/Loading";
import SearchBox from "../../components/SearchBox";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

interface DispatchProps {
}

interface StateProps {
}

type DashboardProps = DispatchProps & StateProps;

const Dashboard: React.FunctionComponent<DashboardProps> = (props) => {

    const characters: any = []; /** TO-DO: define*/
    const error = false;
    const pending = false;

    const isError = !pending && error;
    const isNoContent = !pending && !error && characters.length === 0;

    return <>
        <h2>Welcome to Rick and Morty Characters List!</h2>
        <SearchBox className="dashboard__searchbox" onClear={() => {}} onClick={(value) => value.length !== 0 && {}} />
        {pending && <Loading />}
        {isError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(characters) && <>Characters List</>}
    </>;
}

const mapStateToProps = (state: AppState) => {
    return {
    }
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);