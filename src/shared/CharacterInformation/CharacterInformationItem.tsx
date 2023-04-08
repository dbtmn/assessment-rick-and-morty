import React from "react";

interface CharacterInformationItemProps {
    title: string;
    informationValue: string | number;
}

const CharacterInformationItem: React.FunctionComponent<CharacterInformationItemProps> = (props) => {
    const { title, informationValue } = props;

    return <>
        <span className="character-information__detail-title">{title}</span>
        <span>{informationValue}</span>
    </>
}

export default CharacterInformationItem;