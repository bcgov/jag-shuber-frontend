import * as React from 'react';
import {
    AssignmentDuty,
    Sheriff,
    IdType
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
    sheriffIds: IdType[];
    sheriffsRequired: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps, {}> {

    private canAssignSheriff(sheriff: Sheriff): boolean {
        const { sheriffIds = [] } = this.props.duty;
        return sheriff && sheriffIds.indexOf(sheriff.id) === -1;
    }

    render() {
        const {
            canDropSheriff = (s: Sheriff) => this.canAssignSheriff(s),
            onDropSheriff,
            SheriffAssignmentRenderer = SheriffDutyBarList,
            duty: {
                id = '-1',
                sheriffIds = [],
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
                computeStyle={!onDropSheriff ? (s: {}) => ({}) : undefined}>
                <SheriffAssignmentRenderer
                    sheriffIds={sheriffIds}
                    sheriffsRequired={sheriffsRequired}
                />
                <AssignmentDutyActionsPanel>
                    <AssignmentDutyEditModal color={style.color} dutyId={id} />
                </AssignmentDutyActionsPanel>
            </SheriffDropTarget>
        );
    }
}