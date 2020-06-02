import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
    IdType,
    Location
} from '../api';

import {
    getSheriffLoanStatus,
    SheriffLoanStatus,
    getSheriffCurrentLocation,
    getSheriffHomeLocation
} from '../modules/sheriffs/selectors';

import {
    getLocationById
} from '../modules/system/selectors';

import SheriffLoanInIcon from '../components/Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../components/Icons/SheriffLoanOutIcon';
import { getAllLocations } from '../modules/system/selectors';

interface SheriffLoanIconStateProps {
    status: SheriffLoanStatus;
    homeLocation?: Location;
    getLocation: (locationId: string) => any;
    // currentLocation?: Location;
}

interface SheriffLoanIconProps {
    sheriffId: IdType;
    showLocationName?: boolean;
    style?: any; // React.CSSProperties;
}

class SheriffLoanIcon extends React.PureComponent<
    SheriffLoanIconProps & SheriffLoanIconStateProps> {

    render() {
        const {
            // sheriffId,
            status: { isLoanedIn, isLoanedOut, startDate, endDate, startTime, endTime, location },
            homeLocation = { name: '' },
            getLocation,
            // currentLocation = { name: '' },
            style = {}
        } = this.props;

        let icon = isLoanedIn ? <SheriffLoanInIcon /> : isLoanedOut ? <SheriffLoanOutIcon /> : null;

        const currentLocation = location && location.locationId ? getLocation(location.locationId) : undefined;

        const locationName = isLoanedIn ? `${homeLocation.name}` :
            isLoanedOut && currentLocation ? `${currentLocation.name}` : undefined;

        return (
            <OverlayTrigger
                overlay={(
                    <Tooltip>
                        <p>
                            {isLoanedIn && (
                            <>On loan from <b>{locationName}</b></>
                            )}

                            {isLoanedOut && (
                            <>On loan to <b>{locationName}</b></>
                            )}

                            <br/>

                            {startDate === endDate && (
                            <>
                                <b>Date: {`${startDate}`}</b>
                                <br/>
                                <b>Time: {`${startTime}`}</b> to <b>{`${endTime}`}</b>
                            </>
                            )}
                            {startDate !== endDate && (
                                <>
                                    <b>Date: {`${startDate}`}</b> to <b>{`${endDate}`}</b>
                                </>
                            )}
                        </p>
                    </Tooltip>
                )}
                placement={'right'}>
                <span style={style} >{icon}</span>
            </OverlayTrigger>
        );
    }
}

// tslint:disable-next-line:max-line-length
export default connect<SheriffLoanIconStateProps, {}, SheriffLoanIconProps, RootState>(
    (state, { sheriffId }) => (
        {
            status: getSheriffLoanStatus(sheriffId)(state),
            // currentLocation: getSheriffCurrentLocation(sheriffId)(state),
            homeLocation: getSheriffHomeLocation(sheriffId)(state),
            getLocation: (locationId: string) => getLocationById(locationId)(state)
        }
    )
)(SheriffLoanIcon);
