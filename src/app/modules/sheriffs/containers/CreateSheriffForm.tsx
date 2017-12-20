import { reduxForm } from 'redux-form';
import { default as SheriffForm, SheriffFormProps } from '../components/SheriffForm';
import { createSheriff } from '../actions';
import { SheriffAbility, Sheriff } from '../../../api/index';
// import { connect } from 'react-redux';

// class CreateSheriffForm extends SheriffForm{
//     constructor(props){
//         super(props);
//         this.state = {

//         }
//     }

// }

// const mapStateToProps = (state:RootState,props:SheriffFormProps)=>{
//     // return your selector stuff
// }

// const connectedSheriffForm = connect<SheriffFormProps>(mapStateToProps)(CreateSheriffForm)

const createSheriffFormFactory = reduxForm<SheriffFormProps, any>({ 
    form: 'CreateSheriff',  
    onSubmit: (values:Sheriff|any, dispatch, props)=>{ 
        let newSherrif = Object.assign({},values, {abilities:SheriffAbility.All});
        dispatch(createSheriff(newSherrif));
    }
});
const ConnectedForm = createSheriffFormFactory(SheriffForm);

export default ConnectedForm;