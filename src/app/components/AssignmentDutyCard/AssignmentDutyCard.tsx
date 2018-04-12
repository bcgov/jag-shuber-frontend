import * as React from 'react';
import {
    AssignmentDuty,
    Sheriff,
    SheriffDuty
} from '../../api/index';
import SheriffDropTarget from '../../containers/SheriffDropTarget';
import SheriffDutyBarList from '../SheriffDutyBarList/SheriffDutyBarList';
import AssignmentDutyActionsPanel from '../AssignmentDutyActionsPanel/AssignmentDutyActionsPanel';
import AssignmentDutyEditModal from '../../containers/AssignmentDutyEditModal';
import './AssignmentDutyCard.css';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty;
    canDropSheriff?: (sheriff: Sheriff) => boolean;
    onDropSheriff?: (sheriff: Sheriff) => void;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>;
    style?: React.CSSProperties;
}

export interface SheriffAssignmentRendererProps {
    sheriffDuties: SheriffDuty[];
    duty: AssignmentDuty;
    sheriffsRequired?: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, {}> {

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { sheriffDuties = [] } = this.props.duty;
        return sheriff && sheriffDuties.findIndex(sd => sd.sheriffId === sheriff.id) === -1;
    }

    render() {
        const {
            canDropSheriff = (s: Sheriff) => this.canAssignSheriff(s),
            onDropSheriff,
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
            <SheriffDropTarget
                onDropItem={(s) => onDropSheriff && onDropSheriff(s)}
                canDropItem={canDropSheriff}
                style={{ ...style }}
                className="assignment-duty-card"
                computeStyle={!onDropSheriff ? (s: {}) => ({}) : undefined}
            >
                <SheriffAssignmentRenderer
                    sheriffDuties={sheriffDuties}
                    duty={duty}
                    sheriffsRequired={sheriffsRequired}
                />
                <AssignmentDutyActionsPanel>
                    <AssignmentDutyEditModal color={style.color} dutyId={id} />
                </AssignmentDutyActionsPanel>
            </SheriffDropTarget>
        );
    }
}