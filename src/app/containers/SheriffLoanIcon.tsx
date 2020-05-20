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
            status: { isLoanedIn, isLoanedOut, startDate, endDate, startTime, endTime },
            homeLocation = { name: '' },
            currentLocation = { name: '' },
            style = {}
        } = this.props;

        let icon = isLoanedIn ? <SheriffLoanInIcon /> : isLoanedOut ? <SheriffLoanOutIcon /> : null;

        const locationName = isLoanedIn ? `${homeLocation.name}` :
            isLoanedOut ? `${currentLocation.name}` : undefined;

        return (
            <OverlayTrigger
                overlay={(
                    <Tooltip>
                        <p>
                            On loan to <b>{locationName}</b>
                            <br/>
                            <b>Date: {`${startDate}`}</b> to <b>{`${endDate}`}</b>
                            <br/>
                            <b>Time: {`${startTime}`}</b> to <b>{`${endTime}`}</b>
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
