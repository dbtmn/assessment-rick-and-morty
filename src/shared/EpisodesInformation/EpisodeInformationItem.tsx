import React from "react";
import { Episode } from "../../store/characters/types";

interface EpisodeInformationItemProps {
    episode: Episode;
}

const EpisodeInformationItem: React.FunctionComponent<EpisodeInformationItemProps> = (props) => {
    const { episode } = props;

    return <div className="episodes-information__item">{`${episode.name} (${episode.episode})`}</div>;
};

export default EpisodeInformationItem;