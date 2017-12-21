import { reduxForm } from 'redux-form';
import { default as TaskForm, TaskFormProps } from '../components/TaskForm';
import { SheriffTask, SheriffAbility } from '../../../api/index';
import { createTask } from '../actions';


const createSheriffFormFactory = reduxForm<TaskFormProps, any>({ 
    form: 'CreateTaskForm',
    onSubmit: (values:SheriffTask|any, dispatch, props) =>{
        let newTask = Object.assign({}, values, {requiredAbilities:SheriffAbility.All}, {sheriffIds:[]})
        dispatch(createTask(newTask));
    } 
});
const ConnectedForm = createSheriffFormFactory(TaskForm);

export default ConnectedForm;