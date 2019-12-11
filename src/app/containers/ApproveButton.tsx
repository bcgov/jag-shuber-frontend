import React from 'react';
import moment from 'moment';
import {
    Button, Glyphicon
} from 'react-bootstrap';
import ConfirmationModal, { ConnectedConfirmationModalProps } from './ConfirmationModal';
import { connect } from 'react-redux';
import { Leave } from '../api';
import LeaveApproveReasonSelector from './LeaveCancelReasonSelector';
import { getLeave } from '../modules/leaves/selectors';
import { createOrUpdateLeaves } from '../modules/leaves/actions';
import { RootState } from '../store';

interface ApproveButtonProps {
    modelId: string;
}

interface ApproveButtonStateProps {
    model?: Leave;
}
interface ApproveButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) => void;
    approveLeave: (model: Leave) => void;
}

type ApproveButtonCompositProps = ApproveButtonProps & ApproveButtonDispatchProps & ApproveButtonStateProps;
class ApproveButton extends React.PureComponent<ApproveButtonCompositProps> {

    async handleApprove(approveReason?: string) {
        const {
            model,
            approveLeave
        } = this.props;
        if (approveReason && model) {
            const modelToApprove: Leave = {
                ...model,
                cancelReasonCode: approveReason,
                cancelDate: moment().toISOString()
            };

            await approveLeave(modelToApprove);
        }

    }

    render() {
        const { showConfirmationModal } = this.props;
        return (
            <Button
                bsStyle="success"
                onClick={() => showConfirmationModal({
                    confirmBtnLabel: 'OK',
                    RenderComponent: ({ onValueChanged, value }) => (
                        <div>
                            <h3>Select a Reason for Approveling Leave</h3>
                            <LeaveApproveReasonSelector
                                label="Approve Reason"
                                value={value}
                                onChange={onValueChanged}
                            />
                        </div>
                    ),
                    onConfirm: (value) => this.handleApprove(value)
                })}
            >
                <Glyphicon glyph="ok" />
            </Button>

        );
    }
}

export default connect<ApproveButtonStateProps, ApproveButtonDispatchProps, ApproveButtonProps, RootState>(
    (state, { modelId }) => {
        return {
            model: getLeave(modelId)(state)
        };
    },
    {
        showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) =>
            ConfirmationModal.ShowAction<string>(props),
        approveLeave: (modelToApprove) => createOrUpdateLeaves([modelToApprove])
    }
)(ApproveButton);
