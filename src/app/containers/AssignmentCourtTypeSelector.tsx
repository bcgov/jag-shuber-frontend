import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Courtroom, COURT_ASSIGNMENT_ROOM, COURT_ASSIGNMENT_ROLE,
    CourtRoleCode
} from '../api/Api';
import {
    allCourtRoles,
    allCourtrooms
} from '../modules/assignments/selectors';
import SelectorWithOptGroup, { SelectorWithOptGroupProps } from '../components/FormElements/SelectorWithOptGroups';

interface CourtAssignmentSelectorStateProps {
    courtrooms: Courtroom[];
    courtRoles: CourtRoleCode[];
}

class CourtAssignmentList extends React.PureComponent<
    SelectorWithOptGroupProps & CourtAssignmentSelectorStateProps> {

    render() {
        const {
            courtrooms = [],
            courtRoles = [],
            ...restProps
        } = this.props;

        const courtroomSelectorValues = courtrooms
            .map(courtroom => ({ key: `${COURT_ASSIGNMENT_ROOM}:${courtroom.id}`, value: courtroom.code }));
        const rolesSelectorValues = courtRoles
            .map(role => ({ key: `${COURT_ASSIGNMENT_ROLE}:${role.code}`, value: role.description }));

        return (
            <SelectorWithOptGroup
                {...restProps}
                data={[
                    { optGroupLabel: 'Courtrooms', options: courtroomSelectorValues },
                    { optGroupLabel: 'Roles', options: rolesSelectorValues }
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
export default connect<CourtAssignmentSelectorStateProps, {}, SelectorWithOptGroupProps>(
    mapStateToProps
)(CourtAssignmentList);
