import React from "react";
import Icon from "../../components/Icon";

import "./index.scss";

interface NoContentProps {
    message: string;
}

const NoContent: React.FunctionComponent<NoContentProps> = (props) => {
    const { message } = props;

    return <div className="no-content">
        <Icon iconClassName="no-content__result-icon" iconName="search_off" />
        <div>
            {message}
        </div>
    </div>
}

export default NoContent;