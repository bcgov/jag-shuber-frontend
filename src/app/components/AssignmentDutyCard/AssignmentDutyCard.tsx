import * as React from 'react';
import {
    AssignmentDuty,
    // Sheriff,
    SheriffDuty
} from '../../api/index';
// import SheriffDropTarget from '../../containers/SheriffDropTarget';
import SheriffDutyBarList from '../SheriffDutyBarList/SheriffDutyBarList';
import AssignmentDutyActionsPanel from '../AssignmentDutyActionsPanel/AssignmentDutyActionsPanel';
import AssignmentDutyEditModal from '../../containers/AssignmentDutyEditModal';
import './AssignmentDutyCard.css';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>;
    style?: React.CSSProperties;
}

export interface SheriffAssignmentRendererProps {
    sheriffDuties: SheriffDuty[];
    duty: AssignmentDuty;
    sheriffsRequired?: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, {}> {

    render() {
        const {
            SheriffAssignmentRenderer = SheriffDutyBarList,
            duty,
            duty: {
                id = '-1',
                sheriffDuties = [],
                sheriffsRequired = 0
            } = {},
            style = {}
        } = this.props;

        return (
            <div className="assignment-duty-card" style={{...style}}>
                <SheriffAssignmentRenderer
                    sheriffDuties={sheriffDuties}
                    duty={duty}
                    sheriffsRequired={sheriffsRequired}
                />
                <AssignmentDutyActionsPanel>
                    <AssignmentDutyEditModal color={style.color} dutyId={id} />
                </AssignmentDutyActionsPanel>
            </div>
        );
    }
}