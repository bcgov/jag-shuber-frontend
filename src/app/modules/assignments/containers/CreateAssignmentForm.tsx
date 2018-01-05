import { reduxForm } from 'redux-form';
import { default as AssignmentForm, AssignmentFormProps } from '../components/AssignmentForm';
import { SheriffAssignment, SheriffAbility } from '../../../api/index';
import { createAssignment } from '../actions';

// wrapping generic assignment form in redux-form
export default reduxForm<AssignmentFormProps, any>({ 
    form: 'CreateAssignmentForm',
    onSubmit: (values:SheriffAssignment|any, dispatch, props) =>{
        let newAssignment = Object.assign({}, values, {requiredAbilities:SheriffAbility.All}, {sheriffIds:[]})
        dispatch(createAssignment(newAssignment));
    } 
})(AssignmentForm);


