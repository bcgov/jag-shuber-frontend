import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';

import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
    IdType,
    Location
} from '../api';

import {
    getSheriffHomeLocation,
    getSheriffLoanStatus,
    SheriffLoanStatus,
} from '../modules/sheriffs/selectors';

import SheriffLoanInIcon from '../components/Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../components/Icons/SheriffLoanOutIcon';

interface SheriffLoanIconStateProps {
    status: SheriffLoanStatus;
    homeLocation?: Location;
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
            status: { isLoanedIn, isLoanedOut, startDate, endDate, startTime, endTime, location = { name: '' } },
            homeLocation = { name: '' },
            style = {}
        } = this.props;

        let icon = isLoanedIn ? <SheriffLoanInIcon /> : isLoanedOut ? <SheriffLoanOutIcon /> : null;

        const locationName = isLoanedIn ? `${homeLocation.name}` :
            isLoanedOut && location ? `${location.name}` : undefined;

        return (
            <OverlayTrigger
                overlay={(
                    <Tooltip>
                        {locationName && (
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
                        )}
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
            // getLocation: (locationId: string) => getLocationById(locationId)(state)
        }
    )
)(SheriffLoanIcon);
