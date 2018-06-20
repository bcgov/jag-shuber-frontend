import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import {
    default as SheriffForm,
    SheriffFormProps
} from '../components/SheriffForm';
import {
    default as FormSubmitButton,
    SubmitButtonProps
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriff } from '../modules/sheriffs/selectors';
import { updateSheriff } from '../modules/sheriffs/actions';
import {
    IdType,
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, SheriffFormProps> = {
    form: 'EditSheriff',
    onSubmit: (values, dispatch, props) => {
        const updatedSheriff = SheriffForm.parseSheriffFromValues(values);
        dispatch(updateSheriff(updatedSheriff));
    }
};

export interface SheriffEditFormProps extends SheriffFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: SheriffEditFormProps) => {
    const initialSheriff = getSheriff(props.id)(state);
    if (initialSheriff) {
        return {
            initialValues: initialSheriff,
            isNewSheriff: false
        };
    } else {
        return {};
    }
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
// tslint:disable-next-line:max-line-length
export default class SheriffEditForm extends connect<any, {}, SheriffEditFormProps>(mapStateToProps)(reduxForm(formConfig)(SheriffForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
