import { reduxForm } from 'redux-form';
import { default as TaskForm, TaskFormProps } from '../components/TaskForm';
import { SheriffTask, SheriffAbility } from '../../../api/index';
import { createTask } from '../actions';

// wrapping generic task form in redux-form
export default reduxForm<TaskFormProps, any>({ 
    form: 'CreateTaskForm',
    onSubmit: (values:SheriffTask|any, dispatch, props) =>{
        let newTask = Object.assign({}, values, {requiredAbilities:SheriffAbility.All}, {sheriffIds:[]})
        dispatch(createTask(newTask));
    } 
})(TaskForm);


