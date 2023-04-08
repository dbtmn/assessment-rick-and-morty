import React from "react";
import Icon from "../../components/Icon";

import "./index.scss";

interface HeaderProps {
    title: string;
    iconType: string;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const { title, iconType } = props;

    return <div className="header__wrapper">
        <Icon iconClassName="header__icon" iconName={iconType} />
        <h2>{title}</h2>
    </div>
};

export default Header;