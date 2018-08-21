import React from 'react';
import moment from 'moment';
import { RootState } from '../store';
import {
    Modal
} from 'react-bootstrap';
import AssignmentSheriffDutyReassignmentForm from './AssignmentSheriffDutyReassignmentForm';
import { SheriffDuty } from '../api';
import { connect } from 'react-redux';
import { IModalInjectedProps, connectModal } from 'redux-modal';
import { ConnectedShowModalButton } from './ConnectedShowModalButton';
import { show as showModal, hide as hideModal } from 'redux-modal';
import { visibleTime } from '../modules/dutyRoster/selectors';
import * as TimeUtils from '../infrastructure/TimeRangeUtils';

export interface AssignmentSheriffDutyReassignmentModalProps {
    sourceSheriffDuty: SheriffDuty;
    targetSheriffDuty: SheriffDuty;
    isDoubleBooking: boolean;
}

export interface AssignmentSheriffDutyReassignmentModalDispatchProps {
}

export interface AssignmentSheriffDutyReassignmentModalStateProps {
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

type CompositeProps = 
    AssignmentSheriffDutyReassignmentModalProps 
    & AssignmentSheriffDutyReassignmentModalDispatchProps
    & AssignmentSheriffDutyReassignmentModalStateProps 
    & IModalInjectedProps;

class AssignmentSheriffDutyReassignmentModal extends React.PureComponent<CompositeProps> {

    render() {
        const {
            show,
            handleHide,
            sourceSheriffDuty,
            targetSheriffDuty,
            isDoubleBooking,
            visibleTimeStart
        } = this.props;

        return (
            <Modal
                show={show}
                onHide={handleHide}
                dialogClassName="modal-large"
                style={{
                    maxSize: '70%'
                }}
            >
                <Modal.Header closeButton={true}>Re-Assign Sheriff</Modal.Header>
                <Modal.Body>
                    <AssignmentSheriffDutyReassignmentForm 
                        sourceDuty={sourceSheriffDuty} 
                        targetDuty={targetSheriffDuty}
                        isDoubleBooking={isDoubleBooking}
                        onSubmitSuccess={handleHide}
                        minTime={TimeUtils.getDefaultTimePickerMinTime(moment(visibleTimeStart)).toISOString()}
                        maxTime={TimeUtils.getDefaultTimePickerMaxTime(moment(visibleTimeStart)).toISOString()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <AssignmentSheriffDutyReassignmentForm.SubmitButton key="save">
                        Save
                    </AssignmentSheriffDutyReassignmentForm.SubmitButton>
                </Modal.Footer>
            </Modal>
        );
    }
}

const modalConfig = {
    name: 'AssignmentSheriffDutyReassignmentModal'
};

const mapStateToProps = (state: RootState) => {
    const currentVisibleTime = visibleTime(state);
    return {
        ...currentVisibleTime,
    };
};

// Here we extend the Higher Order Component so that we can add on some static
// members that can be used to hide the modal configuration from consumers
export default class extends connectModal(modalConfig)(
    connect<AssignmentSheriffDutyReassignmentModalStateProps, AssignmentSheriffDutyReassignmentModalDispatchProps, AssignmentSheriffDutyReassignmentModalProps>(
        mapStateToProps,
        {})
        (AssignmentSheriffDutyReassignmentModal) as any
) {
    static modalName = modalConfig.name;

    static ShowButton = (props: AssignmentSheriffDutyReassignmentModalProps) => (
        <ConnectedShowModalButton modalName={modalConfig.name} modalProps={props} />
    )

    static ShowAction = (sourceSheriffDuty: SheriffDuty, targetSheriffDuty: SheriffDuty, isDoubleBooking: boolean) => 
        showModal(modalConfig.name, { sourceSheriffDuty, targetSheriffDuty, isDoubleBooking })
    static HideAction = () => hideModal(modalConfig.name);
}