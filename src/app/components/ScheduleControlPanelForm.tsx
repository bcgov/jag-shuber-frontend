import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import {
    Form
} from 'react-bootstrap';
import {
    Field,
    InjectedFormProps
} from 'redux-form';
import SheriffSelector from '../containers/SheriffSelector';
import WorkSectionSelector from '../components/FormElements/WorkSectionSelector';
import { ConfirmationModal } from './ConfirmationModal';
import { IdType, ShiftUpdates } from '../api/Api';
import TimePickerField from './FormElements/TimePickerField';

export interface ScheduleControlPanelFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
    onCancel?: () => void;
    onDelete?: () => void;
    onApply?: () => void;
    selectedShiftIds?: IdType[];
    canAssignSheriff?: boolean;
}

export default class ScheduleControlPanelForm extends
    React.Component<ScheduleControlPanelFormProps & InjectedFormProps<{}, ScheduleControlPanelFormProps>, {}> {

    static parseUpdateDetailsFromValues(values: any): ShiftUpdates {
        return { ...values } as ShiftUpdates;
    }

    render() {
        const { handleSubmit, onApply, onCancel, onDelete, selectedShiftIds, canAssignSheriff = true } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit} inline={true}>
                    <Field
                        name="sheriffId"
                        component={(p) => 
                            <SheriffSelector {...p} showVariedOption={true} isDisabled={canAssignSheriff} />}
                    />
                    <Field
                        name="startTime"
                        component={
                            (p) => 
                                <TimePickerField 
                                    {...p} 
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? '--:--' : 'Start'}
                                />
                        }
                        label="Start Time"
                    />
                    <span style={{color: 'white'}}>&mdash;</span>
                    <Field
                        name="endTime"
                        component={
                            (p) => 
                                <TimePickerField 
                                    {...p} 
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? '--:--' : 'End'}
                                />
                        }
                        label="End Time"
                    />
                    <Field
                        name="workSectionId"
                        component={(p) => <WorkSectionSelector {...p} showVariedOption={true} />}
                    />
                    <ConfirmationModal
                        key="confirmationModal"
                        onConfirm={() => onDelete && onDelete()}
                        actionBtnLabel={<Glyphicon glyph="trash" />}
                        actionBtnStyle="danger"
                        confirmBtnLabel="Delete"
                        confirmBtnStyle="danger"
                        // tslint:disable-next-line:max-line-length
                        message={<p style={{ fontSize: 14 }}>Please confirm that you would like to <b>permanently delete</b> the selected shift(s).</p>}
                        title="Delete Shift(s)"
                    />
                    <Button className="cancel-button" style={{marginRight: 6}} onClick={() => onCancel && onCancel()}>
                        Clear
                    </Button>
                   <Button className="apply-button" onClick={() => onApply && onApply()}>
                        Apply <span style={{ paddingTop: 2, fontSize: 10 }}>&#9658;</span>
                    </Button>
                </Form>
            </div>
        );
    }
}