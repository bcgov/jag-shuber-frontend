import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Courtroom, COURT_ASSIGNMENT_ROOM, COURT_ASSIGNMENT_ROLE,
    CourtRole
} from '../api/Api';
import { 
    allCourtRoles, 
    allCourtrooms 
} from '../modules/assignments/selectors';
import SelectorWithOptGroup, { SelectorWithOptGroupProps } from '../components/FormElements/SelectorWithOptGroups';

interface CourthouseCourtAssignmentSelectorStateProps {
    courtrooms: Courtroom[];
    courtRoles: CourtRole[];
}

class CourthouseCourtAssignmentList extends React.PureComponent<
    SelectorWithOptGroupProps & CourthouseCourtAssignmentSelectorStateProps> {

    render() {
        const {
            courtrooms = [],
            courtRoles = [],
            ...restProps
        } = this.props;

        const courtroomSelectorValues = courtrooms
            .map(courtroom => ({ key: `${COURT_ASSIGNMENT_ROOM}:${courtroom.id}`, value: courtroom.name }));
        const rolesSelectorValues = courtRoles
            .map(role => ({ key: `${COURT_ASSIGNMENT_ROLE}:${role.code}`, value: role.description }));

        return (
            <SelectorWithOptGroup
                {...restProps}
                data={[
                    { optGroupLabel: 'Roles', options: rolesSelectorValues },
                    { optGroupLabel: 'Courtrooms', options: courtroomSelectorValues }
                ]}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        courtrooms: allCourtrooms(state),
        courtRoles: allCourtRoles(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseCourtAssignmentSelectorStateProps, {}, SelectorWithOptGroupProps>(
    mapStateToProps
)(CourthouseCourtAssignmentList);