import { 
    reduxForm
} from 'redux-form';
import {
    default as SheriffForm,
    SheriffFormProps
} from '../components/SheriffForm';

export default reduxForm<SheriffFormProps, any>({ form: 'CreateSheriff' })(SheriffForm)