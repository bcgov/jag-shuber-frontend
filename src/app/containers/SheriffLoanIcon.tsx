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

import SheriffLoanInIcon from '../components/Icons/SheriffLoanInIcon';
import SheriffLoanOutIcon from '../components/Icons/SheriffLoanOutIcon';

interface SheriffLoanIconStateProps {
    status: SheriffLoanStatus;
    homeLocation?: Location;
    currentLocation?: Location;
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
            sheriffId,
            status: { isLoanedIn, isLoanedOut, startDate, endDate, startTime, endTime },
            homeLocation = { name: '' },
            currentLocation = { name: '' },
            style = {}
        } = this.props;

        /* if (sheriffId === '') {
            console.log('re-rendering sheriffloanicon');
            console.log(homeLocation);
            console.log(currentLocation);
        } */

        let icon = isLoanedIn ? <SheriffLoanInIcon /> : isLoanedOut ? <SheriffLoanOutIcon /> : null;

        const locationName = isLoanedIn ? `${homeLocation.name}` :
            isLoanedOut ? `${currentLocation.name}` : undefined;

        return (
            <OverlayTrigger
                overlay={(
                    <Tooltip>
                        <p>
                            {isLoanedIn || isLoanedOut && (
                            <>On loan {isLoanedIn ? 'from' : isLoanedOut ? 'to' : ''} <b>{locationName}</b></>
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
            currentLocation: getSheriffCurrentLocation(sheriffId)(state),
            homeLocation: getSheriffHomeLocation(sheriffId)(state),
        }
    )
)(SheriffLoanIcon);
