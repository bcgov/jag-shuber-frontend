import { connect } from 'react-redux';
import React from 'react';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import { ManageAssignmentTypesDispatchProps, ManageAssignmentTypesStateProps } from '../pages/ManageAssignmentTypes';

import { RootState } from '../store';
import { getLocationById } from '../modules/system/selectors';
import { currentLocation as getCurrentLocation } from '../modules/user/selectors';

import { Location } from '../api';

export interface PageTitleStateProps {
    systemLocation?: Location;
}

export interface PageTitleProps extends PageTitleStateProps {
    title: ((params: any) => string) | string;
}

class PageTitle extends React.PureComponent<PageTitleProps> {
    static defaultProps: Partial<PageTitleProps> = {};

    render() {
        const { systemLocation, title } = this.props;

        const currentLocationName = systemLocation && systemLocation.name
            ? systemLocation.name
            : 'Provincial';

        let titleString;
        titleString = (typeof title === 'function')
            ? title({ currentLocationName })
            : title;

        return (
            <div className="container-fluid" style={{width: '100%'}}>
                <h3
                    style={{
                        paddingBottom: '10px',
                        borderBottom: '1px dotted grey',
                        color: '#003366'
                    }}
                >
                    {titleString}
                </h3>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        systemLocation: getLocationById(getCurrentLocation(state))(state),
    };
};

export default connect<PageTitleStateProps, null, PageTitleProps>(
  mapStateToProps
)(PageTitle);
