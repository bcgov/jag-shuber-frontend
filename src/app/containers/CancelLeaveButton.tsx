import React from 'react';
import moment from 'moment';
import {
    Button, Glyphicon
} from 'react-bootstrap';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import { Leave } from '../api';
import LeaveCancelReasonSelector from './LeaveCancelReasonSelector';
import { getLeave } from '../modules/leaves/selectors';
import { createOrUpdateLeaves } from '../modules/leaves/actions';
import { RootState } from '../store';

interface CancelLeaveButtonProps {
    leaveId: string;
}

interface CancelLeaveButtonStateProps {
    leave?: Leave;
}
interface CancelLeaveButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) => void;
    cancelLeave: (leave: Leave) => void;
}

type CancelButtonCompositProps = CancelLeaveButtonProps & CancelLeaveButtonDispatchProps & CancelLeaveButtonStateProps;
class CancelLeaveButton extends React.PureComponent<CancelButtonCompositProps> {

    async handleCancelLeave(cancelReason?: string) {
        const { 
            leave, 
            cancelLeave
        } = this.props;
        if (cancelReason && leave) {
            const leaveToCancel: Leave = {
                ...leave,
                cancelReasonCode: cancelReason,
                cancelDate: moment().toISOString()
            };

            await cancelLeave(leaveToCancel);
        }

    }

    render() {
        const { showConfirmationModal } = this.props;
        return (
            <Button
                bsStyle="danger"
                onClick={() => showConfirmationModal({
                    confirmBtnLabel: 'OK',
                    RenderComponent: ({ onValueChanged, value }) => (
                        <div>
                            <h3>Select a Reason for Cancelling Leave</h3>
                            <LeaveCancelReasonSelector
                                label="Cancel Reason"
                                value={value}
                                onChange={onValueChanged}
                            />
                        </div>
                    ),
                    onConfirm: (value) => this.handleCancelLeave(value)
                })}
            >
                <Glyphicon glyph="ban-circle" />
            </Button>

        );
    }
}

export default connect<CancelLeaveButtonStateProps, CancelLeaveButtonDispatchProps, CancelLeaveButtonProps, RootState>(
    (state, { leaveId }) => {
        return {
            leave: getLeave(leaveId)(state)
        };
    },
    {
        showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) =>
            ConfirmationModal.ShowAction<string>(props),
        cancelLeave: (leaveToCancel) => createOrUpdateLeaves([leaveToCancel])
    }
)(CancelLeaveButton);
