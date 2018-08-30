import React from 'react';
import {
    AssignmentDuty,
    SheriffDuty
} from '../../api/Api';
import SheriffDutyBarList from '../SheriffDutyBarList/SheriffDutyBarList';
import './AssignmentDutyCard.css';
import { Glyphicon } from 'react-bootstrap';
import AssignmentDutyInformationPanel from '../AssignmentDutyInformationPanel/AssignmentDutyInformationPanel';

export interface AssignmentDutyCardProps {
    duty: AssignmentDuty;
    SheriffAssignmentRenderer?: React.ComponentType<SheriffAssignmentRendererProps>;
    style?: React.CSSProperties;
    onDoubleClick?: () => void;
    onClick?: () => void;
}

export interface SheriffAssignmentRendererProps {
    sheriffDuties: SheriffDuty[];
    duty: AssignmentDuty;
    sheriffsRequired?: number;
}

export default class AssignmentDutyCard extends React.PureComponent<AssignmentDutyCardProps> {

    render() {
        const {
            SheriffAssignmentRenderer = SheriffDutyBarList,
            duty,
            duty: {
                sheriffDuties = [],
                sheriffsRequired = 0,
                comments = ''
            } = {},
            onDoubleClick,
            onClick,
            style = {}
        } = this.props;

        return (
            <div
                className="assignment-duty-card drop-shadow-hover"
                style={{ ...style }}
                onDoubleClick={() => onDoubleClick && onDoubleClick()}
                onMouseDown={() => onClick && onClick()}
            >
                <SheriffAssignmentRenderer
                    sheriffDuties={sheriffDuties}
                    duty={duty}
                    sheriffsRequired={sheriffsRequired}
                />
                <AssignmentDutyInformationPanel>
                    {comments &&
                        <Glyphicon style={{ fontSize: 16, paddingTop: 10 }} title={comments} glyph="comment" />}
                </AssignmentDutyInformationPanel>
            </div>
        );
    }
}