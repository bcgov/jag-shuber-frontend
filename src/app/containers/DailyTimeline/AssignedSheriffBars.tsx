import * as React from 'react'
import {
    Glyphicon,
    Label
} from 'react-bootstrap'
import './AssignedSheriffBars.css'
import { RootState } from '../../store';
import { IdType } from '../../api';
import { connect } from 'react-redux';
import { getSheriff } from '../../modules/sheriffs/selectors';

interface DutyAssignmentBarProps {
    sheriffId?: IdType;
    isAssigned: boolean;
    isExtra?: boolean;
    showBorder?: boolean;
    onRemove?: () => void;
}


interface DutyAssignmentBarStateProps {
    title: string;
}

class DutyAssignmentBar extends React.PureComponent<DutyAssignmentBarProps & DutyAssignmentBarStateProps>{
    render() {
        const {
            title,
            isAssigned,
            isExtra = false,
            showBorder = true,
            onRemove
        } = this.props;
        const backgroundColor = isAssigned ? (!isExtra ? 'green' : 'orange') : 'transparent';
        return (
            <div className="assignedSheriff" style={{
                backgroundColor,
                borderBottomWidth: showBorder ? 1 : 0,
            }}>
                {isAssigned && (
                    <div style={{ margin: 'auto' }}>
                        {title}
                        {onRemove !== undefined && (
                            <Label
                                className="removeAssignmentButton"
                                bsSize="xs"
                                onClick={() => onRemove && onRemove()}
                                bsStyle="danger">
                                <Glyphicon glyph="remove" />
                            </Label>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState, props: DutyAssignmentBarProps) => {
    const { sheriffId } = props;
    const sheriff = getSheriff(sheriffId)(state);
    const title = sheriff == null ? "" : `${sheriff.lastName}, ${sheriff.firstName.charAt(0)}`
    return {
        title,
        ...props
    };
}


const ConnectedDutyAssignmentBar = connect<DutyAssignmentBarStateProps, {}, DutyAssignmentBarProps>(
    mapStateToProps)(DutyAssignmentBar);



interface AssignedSheriffBarsProps {
    sheriffIds: number[];
    sheriffsRequired: number;
    onRemove?: (sheriffId: number) => void;
}

export default class AssignedSheriffBars extends React.PureComponent<AssignedSheriffBarsProps>{
    render() {
        const {
            sheriffIds = [],
            sheriffsRequired = 0,
            onRemove
        } = this.props;
        // Preallocate array so that we can show blanks if present
        const sheriffAssignments = new Array<number | undefined>(Math.max(sheriffIds.length, sheriffsRequired));
        let size = sheriffAssignments.length;
        while (size--) {
            sheriffAssignments[size] = undefined;
        }
        // Add in the actual assigned items
        sheriffIds.forEach((id, index) => sheriffAssignments[index] = id);
        return (
            <div className="assignedSheriffs">
                {sheriffAssignments.map((id, index) => (
                    <ConnectedDutyAssignmentBar
                        onRemove={() => onRemove && id !== undefined && onRemove(id)}
                        sheriffId={id}
                        isAssigned={id !== undefined}
                        isExtra={index + 1 > sheriffsRequired}
                        showBorder={index + 1 != sheriffAssignments.length}
                    />
                )
                )}
            </div>
        )
    }
}




