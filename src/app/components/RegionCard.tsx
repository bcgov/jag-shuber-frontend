import * as React from 'react';
import { 
    REGIONS,
    SheriffLocation, 
    BLANK_SHERIFF_LOCATION
} from '../api'

export interface RegionCardProps {
    location?: SheriffLocation;
}

export default class RegionCard extends React.PureComponent<RegionCardProps, any> {
    render() {
        const { location=BLANK_SHERIFF_LOCATION } = this.props;
        const { regionId } = location;
        return (
            <div>
                {regionId && REGIONS[regionId]}
            </div>
        );
    }
}
