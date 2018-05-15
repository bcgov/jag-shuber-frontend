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
import TextField from '../components/FormElements/TextField';
import WorkSectionSelector from '../components/FormElements/WorkSectionSelector';
import { ConfirmationModal } from './ConfirmationModal';
import { IdType, ShiftUpdates } from '../api/Api';

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
        // const {sheriffId, workSectionId, ...rest} = values;
        // const updateDetails: ShiftUpdates = { ...rest };
        // updateDetails.sheriffId = sheriffId === 'varied' ? 
        return {...values} as ShiftUpdates;
    }

    render() {
        const { handleSubmit, onApply, onCancel, onDelete } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit} inline={true}>
                    <Field
                        name="sheriffId"
                        component={SheriffSelector}
                    /> &nbsp;
                    <Field
                        name="time"
                        component={TextField}
                    />&nbsp;
                    <Field
                        name="workSectionId"
                        component={WorkSectionSelector}
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