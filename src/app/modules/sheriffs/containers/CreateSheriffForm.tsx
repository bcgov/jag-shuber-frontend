import { reduxForm } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../actions';
import { SheriffAbility, Sheriff } from '../../../api/index';

const createSheriffFormFactory = reduxForm<SheriffFormProps, any>({ 
    form: 'CreateSheriff',  
    onSubmit: (values:Sheriff|any, dispatch, props)=>{ 
        let newSherrif = Object.assign({},values, {abilities:SheriffAbility.All});
        dispatch(createSheriff(newSherrif));
    } 
});
const ConnectedForm = createSheriffFormFactory(SheriffForm);

export default ConnectedForm;