import React from "react";
import { DataTestId } from "../../constants/DataTestId";

import "./index.scss";

const Loading: React.FunctionComponent = () => {

    return <div data-testid={DataTestId.LOADING} className="loading__wrapper">
        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>;
};

export default Loading;