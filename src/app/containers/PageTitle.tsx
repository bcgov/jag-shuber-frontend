import { connect } from 'react-redux';
import React from 'react';
import { AdminFormProps } from '../components/AdminForm/AdminForm';
import { ManageAssignmentTypesDispatchProps, ManageAssignmentTypesStateProps } from '../pages/ManageAssignmentTypes';

import { RootState } from '../store';
import { getLocationById } from '../modules/system/selectors';
import { currentLocation as getCurrentLocation } from '../modules/user/selectors';

export interface ManageAssignmentTypesStateProps {
    currentLocation: any;
}

export interface ManageAssignmentTypesProps extends ManageAssignmentTypesStateProps {
    title: ((params: any) => string) | string;
}

class PageTitle extends React.PureComponent<AdminFormProps & ManageAssignmentTypesProps> {
    static defaultProps: Partial<ManageAssignmentTypesProps> = {
        selectedSection: 'courts'
    };

    render() {
        const { currentLocation, title } = this.props;

        const currentLocationName = currentLocation && currentLocation.name
            ? currentLocation.name
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
        currentLocation: getLocationById(getCurrentLocation(state))(state),
    };
};

export default connect<ManageAssignmentTypesStateProps>(
  mapStateToProps
)(PageTitle);
