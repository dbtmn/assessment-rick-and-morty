import React from "react";
import Icon from "../../components/Icon";
import { DataTestId } from "../../constants/DataTestId";

import "./index.scss";

export enum ErrorSize {
    sm = "small",
    md = "medium",
    lg = "large"
}

interface ErrorProps {
    message: string;
    size?: ErrorSize;
}

const Error: React.FunctionComponent<ErrorProps> = (props) => {
    const { message, size = ErrorSize.sm } = props;

    const getClassName = () => `error__icon error-icon--${size}`;

    return <div data-testid={DataTestId.ERROR} className="error__wrapper">
        <Icon iconClassName={getClassName()} iconName="error" />
        <div className="error__message">
            {message}
        </div>
    </div>;
};

export default Error;