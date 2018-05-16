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
}

export default class ScheduleControlPanelForm extends
    React.Component<ScheduleControlPanelFormProps & InjectedFormProps<{}, ScheduleControlPanelFormProps>, {}> {

    static parseUpdateDetailsFromValues(values: any): ShiftUpdates {
        return { ...values } as ShiftUpdates;
    }

    render() {
        const { handleSubmit, onApply, onCancel, onDelete, selectedShiftIds } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit} inline={true}>
                    <Field
                        name="sheriffId"
                        component={(p) => <SheriffSelector {...p} showVariedOption={true} />}
                    /> &nbsp;
                    <Field
                        name="startTime"
                        component={
                            (p) => 
                                <TimePickerField 
                                    {...p} 
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? 'Start Time Varied' : 'Select Start Time'}
                                />
                        }
                        label="Start Time"
                    />&nbsp;
                    <Field
                        name="endTime"
                        component={
                            (p) => 
                                <TimePickerField 
                                    {...p} 
                                    nullTimeLabel={
                                        (selectedShiftIds && selectedShiftIds.length > 0)
                                            ? 'End Time Varied' : 'Select End Time'}
                                />
                        }
                        label="End Time"
                    />&nbsp;
                    <Field
                        name="workSectionId"
                        component={(p) => <WorkSectionSelector {...p} showVariedOption={true} />}
                    />&nbsp;&nbsp;&nbsp;&nbsp;
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
                    <Button className="cancel-button" onClick={() => onCancel && onCancel()}>
                        Cancel
                    </Button>&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button className="apply-button" onClick={() => onApply && onApply()}>
                        Apply <span style={{ paddingTop: 2, fontSize: 10 }}>&#9658;</span>
                    </Button>
                </Form>
            </div>
        );
    }
}