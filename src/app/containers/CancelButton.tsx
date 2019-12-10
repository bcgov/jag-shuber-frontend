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

interface CancelButtonProps {
    modelId: string;
}

interface CancelButtonStateProps {
    model?: Leave;
}
interface CancelButtonDispatchProps {
    showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) => void;
    cancelLeave: (model: Leave) => void;
}

type CancelButtonCompositProps = CancelButtonProps & CancelButtonDispatchProps & CancelButtonStateProps;
class CancelButton extends React.PureComponent<CancelButtonCompositProps> {

    async handleCancel(cancelReason?: string) {
        const {
            model,
            cancelLeave
        } = this.props;
        if (cancelReason && model) {
            const modelToCancel: Leave = {
                ...model,
                cancelReasonCode: cancelReason,
                cancelDate: moment().toISOString()
            };

            await cancelLeave(modelToCancel);
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
                    onConfirm: (value) => this.handleCancel(value)
                })}
            >
                <Glyphicon glyph="ban-circle" />
            </Button>

        );
    }
}

export default connect<CancelButtonStateProps, CancelButtonDispatchProps, CancelButtonProps, RootState>(
    (state, { modelId }) => {
        return {
            model: getLeave(modelId)(state)
        };
    },
    {
        showConfirmationModal: (props: ConnectedConfirmationModalProps<string>) =>
            ConfirmationModal.ShowAction<string>(props),
        cancelLeave: (modelToCancel) => createOrUpdateLeaves([modelToCancel])
    }
)(CancelButton);
