import React from 'react';
import {
    reduxForm,
    ConfigProps,
    InjectedFormProps,
    Field,
    submit
} from 'redux-form';
import {
    default as FormSubmitButton,
    SubmitButtonProps
} from '../../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import Form from '../../components/FormElements/Form';
import ToggleField from '../../components/FormElements/ToggleField';
import './DutyRosterToolsForm.css';
import { DateType } from '../../api';
import { createDefaultDuties, autoAssignSheriffDuties } from '../../modules/assignments/actions';
import HelpPopover from '../../components/HelpPopover';

export interface ImportDefaultDutiesFormProps {
    onSubmitSuccess?: () => void;
    date: DateType;
}

interface ImportDefaultDutiesFormData {
    shouldImportDefaultDuties: boolean;
    shouldAutoAssignSheriffDuties: boolean;
}


// tslint:disable-next-line:max-line-length
class ImportDefaultDutiesForm extends React.PureComponent<InjectedFormProps<ImportDefaultDutiesFormData>> {

    render() {
        return (
            <div className="import-default-duties-form" >
                <Form {...this.props}>
                    <Field
                        label="Import Default Duties"
                        name="shouldImportDefaultDuties"
                        component={
                            (p) => (
                                <ToggleField {...p} />
                            )
                        }
                        fieldToolTip={
                            <HelpPopover
                                // tslint:disable-next-line:max-line-length
                                helpText={'Creates duties based on default duties within the Duty Roster setup'}
                            />
                        }
                    />
                    <Field
                        label="Auto-Assign Sheriff Duties"
                        name="shouldAutoAssignSheriffDuties"
                        component={
                            (p) => (
                                <ToggleField {...p} />
                            )
                        }
                        fieldToolTip={
                            <HelpPopover
                                // tslint:disable-next-line:max-line-length
                                helpText={'Automatically assign Sheriff\'s to Duties based today\'s schedule.'}
                            />
                        }
                    />
                </Form>
            </div>
        );
    }
}
// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<ImportDefaultDutiesFormData, ImportDefaultDutiesFormProps> = {
    form: 'ImportDefaultDuties',
    onSubmit: async (values, dispatch, props) => {
        const { date } = props;
        const { shouldAutoAssignSheriffDuties, shouldImportDefaultDuties } = values;
        if (shouldImportDefaultDuties) {
            await dispatch(createDefaultDuties(date));
        }
        if (shouldAutoAssignSheriffDuties) {
            await dispatch(autoAssignSheriffDuties(date));
        }
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
// tslint:disable-next-line:max-line-length
export default class ConnectedImportDefaultDutiesForm extends connect<any, {}, ImportDefaultDutiesFormProps, RootState>(
    // Map State to Props
    (state, props) => (
        {
            initialValues: {
                shouldImportDefaultDuties: false,
                shouldAutoAssignSheriffDuties: false
            }
        }
    ),
    // Map Dispatch
    {}
)(reduxForm(formConfig)(ImportDefaultDutiesForm as any)) {
    static submitAction = () => submit(formConfig.form);
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
