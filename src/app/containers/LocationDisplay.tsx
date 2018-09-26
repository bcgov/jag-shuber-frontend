import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Location,
    IdType
} from '../api/Api';
import { getLocationById } from '../modules/system/selectors';
import { currentLocation } from '../modules/user/selectors';

interface LocationDisplayListStateProps {
    location?: Location;
}

interface LocationDisplayListProps {
    id?: IdType;
}

class LocationDisplay extends React.PureComponent<
    LocationDisplayListProps & LocationDisplayListStateProps> {

    render() {
        const { location } = this.props;
        return (
            location ? location.name : 'not selected'
        );
    }
}

// tslint:disable-next-line:max-line-length
const ConnectedLocationDisplay = connect<LocationDisplayListStateProps, {}, LocationDisplayListProps, RootState>(
    (state, { id }) => ({
        location: getLocationById(id)(state)
    })
)(LocationDisplay);

const ConnectedCurrentLocationDisplay: React.ComponentType = connect<{ id: string }, {}, {}, RootState>(
    (state) => ({
        id: currentLocation(state)
    })
)(ConnectedLocationDisplay as any) ;

export default class extends ConnectedLocationDisplay {
    static Current = ConnectedCurrentLocationDisplay;
}