import React from "react";
import { isEmpty } from "lodash";
import { LocationState } from "../../store/location/types";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error, { ErrorSize } from "../../shared/Error";
import NoContent from "../../shared/NoContent";

import "./index.scss";

interface LocationInformationProps {
    locationState: LocationState;
}

const LocationInformation: React.FunctionComponent<LocationInformationProps> = (props) => {
    const { locationState } = props;

    const { pending: locationPending, error: locationError, location: characterLocation } = locationState;

    const isLocationError = !locationPending && locationError;
    const isLocationNoContent = !locationPending && !locationError && isEmpty(characterLocation);

    return <>
        <Header title="Origin and location" iconType="place" />
        {locationPending && <Loading />}
        {isLocationError && <Error size={ErrorSize.lg} message="There is an error!" />}
        {isLocationNoContent && <NoContent message="No data found :(" />}
        {!isEmpty(characterLocation) &&
            <div className="location-information__details">
                <LocationInformationItem title="Name" informationValue={characterLocation.name} />
                <LocationInformationItem title="Type" informationValue={characterLocation.type} />
                <LocationInformationItem title="Dimension" informationValue={characterLocation.dimension} />
                <LocationInformationItem title="Number of residents" informationValue={characterLocation.residents.length} />
            </div>
        }
    </>
};

const LocationInformationItem = (props: { title: string, informationValue: string | number }) => {
    const { title, informationValue } = props;

    return <>
        <span className="location-information__detail-title">{title}</span>
        <span>{informationValue}</span>
    </>
}

export default LocationInformation;
