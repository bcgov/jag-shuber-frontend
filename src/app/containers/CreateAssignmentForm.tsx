import * as React from 'react';
import * as moment from 'moment';
import { reduxForm, ConfigProps } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { 
    SheriffAssignment, 
    SheriffAbility
} from '../api/index';
import { createAssignment } from '../modules/assignments/actions';
import { default as FormSubmitButton, SubmitButtonProps } from '../components/FormElements/SubmitButton'


// wrapping generic assignment form in redux-form
const formConfig: ConfigProps<any, AssignmentFormProps> = { 
    form: 'CreateAssignment',
    initialValues: {
        assignment:{
            startTime: moment(),
            endTime: moment()
        }
    },
    onSubmit: (values:{assignment: SheriffAssignment}, dispatch, props) =>{
        const { workSectionId } = props;

        let newAssignment = Object.assign({}, values.assignment,
            {requiredAbilities:SheriffAbility.All, sheriffIds:[], workSectionId}, 
        );
        dispatch(createAssignment(newAssignment));
    } 
};

// Here we create a class that extends the configured assignment form so that we
// can add a static SubmitButton member to it to make the API cleaner
export default class CreateAssignmentForm extends reduxForm(formConfig)(AssignmentForm){
    static SubmitButton = (props: Partial<SubmitButtonProps>) => <FormSubmitButton {...props} formName={formConfig.form} />;
}




