import React from "react";
import { isEmpty } from "lodash";
import { Episode } from "../../store/characters/types";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";
import EpisodeInformationItem from "./EpisodeInformationItem";

interface EpisodesInformationProps {
    pending: boolean;
    episodes: Episode | Episode[];
    error: string | null
}

const EpisodesInformation: React.FunctionComponent<EpisodesInformationProps> = (props) => {
    const { pending, episodes, error } = props;

    const isEpisodesError = !pending && error;
    const isEpisodesNoContent = !pending && !error && isEmpty(episodes);

    return <>
        <Header title="Name of the chapters" iconType="play_circle" />
        {pending && <Loading />}
        {isEpisodesError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isEpisodesNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(episodes) &&
            <div className="episodes-information__wrapper">
                {episodes.hasOwnProperty("length") ?
                    (episodes as Episode[]).map((episode: Episode) => <EpisodeInformationItem key={`episode-item-${episode.id}`} episode={episode} />) :
                    <EpisodeInformationItem key={`episode-item-${(episodes as Episode).id}`} episode={(episodes as Episode)} />
                }
            </div>
        }
    </>
};

export default EpisodesInformation;