import * as React from 'react';
import {
    reduxForm,
    ConfigProps
} from 'redux-form';
import {
    default as SheriffProfileForm,
    SheriffProfileFormProps
} from '../components/SheriffProfile/SheriffProfileForm';
import {
    default as FormSubmitButton,
    SubmitButtonProps
} from '../components/FormElements/SubmitButton';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriff } from '../modules/sheriffs/selectors';
// import { updateSheriff } from '../modules/sheriffs/actions';
import {
    IdType,
} from '../api';

// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, SheriffProfileFormProps> = {
    form: 'EditSherif',
    onSubmit: (values, dispatch, props) => {
        //const updatedSheriff = SheriffProfileForm.parseSheriffFromValues(values);
        //dispatch(updateSheriff(updatedSheriff));
        // dispatch update sheriff leaves
    }
};

export interface SheriffEditProfileFormProps extends SheriffProfileFormProps {
    id: IdType;
}

const mapStateToProps = (state: RootState, props: SheriffEditProfileFormProps) => {
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
export default class SheriffEditProfileForm extends connect<any, {}, SheriffEditProfileFormProps>(mapStateToProps)(reduxForm(formConfig)(SheriffProfileForm)) {
    static SubmitButton = (props: Partial<SubmitButtonProps>) => (
        <FormSubmitButton {...props} formName={formConfig.form} />
    )
}
