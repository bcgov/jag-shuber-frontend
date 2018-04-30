import * as React from 'react';
import {
    AssignmentDuty,
    SheriffDuty,
    AssignmentDutyDetails
} from '../../api/Api';
import SheriffDutyBarList from '../SheriffDutyBarList/SheriffDutyBarList';
import AssignmentDutyActionsPanel from '../AssignmentDutyActionsPanel/AssignmentDutyActionsPanel';
import AssignmentDutyEditModal from '../../containers/AssignmentDutyEditModal';
import './AssignmentDutyCard.css';
import { Glyphicon } from 'react-bootstrap';
import AssignmentDutyInformationPanel from '../AssignmentDutyInformationPanel/AssignmentDutyInformationPanel';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>;
    details?: AssignmentDutyDetails;
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
            details = false,
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
                <AssignmentDutyInformationPanel>
                    {details && 
                        <Glyphicon style={{fontSize: 16, paddingTop: 10}} title={details.comments} glyph="comment" />}
                </AssignmentDutyInformationPanel>
            </div>
        );
    }
}