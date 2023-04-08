import React from "react";
import { Character } from "../../store/characters/types";
import CharacterInformationItem from "./CharacterInformationItem";

import "./index.scss";

interface CharacterInformationProps {
    selectedCharacter: Character;
}

const CharacterInformation: React.FunctionComponent<CharacterInformationProps> = (props) => {
    const { selectedCharacter } = props;

    return <>
        {selectedCharacter.name.length !== 0 && <h2>{selectedCharacter.name}</h2>}
        <div className="character-information__wrapper">
            {selectedCharacter.image && <div className="character-information__image">
                <img src={selectedCharacter.image} />
            </div>}
            <div className="character-information__details">
                <CharacterInformationItem title="Status" informationValue={selectedCharacter.status} />
                <CharacterInformationItem title="Species" informationValue={selectedCharacter.species} />
                <CharacterInformationItem title="Gender" informationValue={selectedCharacter.gender} />
            </div>
        </div>
    </>
};

export default CharacterInformation;