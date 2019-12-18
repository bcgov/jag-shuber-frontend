import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    IdType,
    Location
} from '../api/Api';
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
            status: { isLoanedIn, isLoanedOut },
            homeLocation = { name: '' },
            currentLocation = { name: '' },
            style={}
        } = this.props;

        let icon = isLoanedIn ? <SheriffLoanInIcon /> : isLoanedOut ? <SheriffLoanOutIcon /> : null;
        const title = isLoanedIn ? `loaned from ${homeLocation.name}` :
            isLoanedOut ? `loaned to ${currentLocation.name}` : undefined;


        return (
            <span title={title} style={style} >{icon}</span>
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
