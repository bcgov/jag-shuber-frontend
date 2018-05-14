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

export interface ScheduleControlPanelFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

export default class ScheduleControlPanelForm extends 
    React.Component<ScheduleControlPanelFormProps & InjectedFormProps<{}, ScheduleControlPanelFormProps>, {}> {
    render() {
        const { handleSubmit } = this.props;
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
                   <Button bsStyle="danger"><Glyphicon glyph="trash"/></Button>&nbsp;&nbsp;&nbsp;&nbsp;
                   <Button className="cancel-button">Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                   {/* <ScheduleShiftMultiEditForm.SubmitButton className="apply-button">
                        Apply <span style={{paddingTop: 2, fontSize: 10}}>&#9658;</span>
                   </ScheduleShiftMultiEditForm.SubmitButton> */}
                   {/* <Button className="apply-button">
                        Apply <span style={{paddingTop: 2, fontSize: 10}}>&#9658;</span>
                   </Button> */}
                </Form>
            </div>
        );
    }
}