import * as React from 'react';
import { 
    COURTHOUSES,
    SheriffLocation, 
    BLANK_SHERIFF_LOCATION
} from '../api'

export interface CourthouseCardProps {
    location?: SheriffLocation;
}

export default class CourthouseCard extends React.PureComponent<CourthouseCardProps, any> {
    render() {
        const { location=BLANK_SHERIFF_LOCATION } = this.props;
        const { courthouseId } = location;
        return (
            <div>
                {courthouseId && COURTHOUSES[courthouseId]}
            </div>
        );
    }
}
