import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import {
    Courtroom, COURT_ASSIGNMENT_ROOM, COURT_ASSIGNMENT_ROLE,
    // CourtRole
} from '../api/Api';
import { allCourtrooms } from '../modules/courthouse/selectors';
import SelectorWithOptGroup, { SelectorWithOptGroupProps } from '../components/FormElements/SelectorWithOptGroups';

interface CourthouseCourtAssignmentSelectorStateProps {
    courtrooms: Courtroom[];
    // courtRoles: CourtRole[];
}

class CourthouseCourtAssignmentList extends React.PureComponent<
    SelectorWithOptGroupProps & CourthouseCourtAssignmentSelectorStateProps> {

    render() {
        const {
            courtrooms = [],
            // courtRoles = [],
            ...restProps
        } = this.props;

        const courtRoles = [{ code: 'ROVER', description: 'Rover' }, { code: 'VIDEO', description: 'Video' }];

        const courtroomSelectorValues = courtrooms
            .map(courtroom => ({ key: `${COURT_ASSIGNMENT_ROOM}:${courtroom.id}`, value: courtroom.name }));
        const rolesSelectorValues = courtRoles
            .map(role => ({ key: `${COURT_ASSIGNMENT_ROLE}:${role.code}`, value: role.description }));

        return (
            // <Selector {...restProps} data={selectorValues} />

            // { optGroupLabel: string, options: { key: string | number, value: string }[] }[];

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
        courtrooms: allCourtrooms(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseCourtAssignmentSelectorStateProps, {}, SelectorWithOptGroupProps>(
    mapStateToProps
)(CourthouseCourtAssignmentList);