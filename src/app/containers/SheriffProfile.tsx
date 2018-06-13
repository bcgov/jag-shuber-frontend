// import * as React from 'react';
import SheriffProfileComponent, { SheriffProfileProps } from '../components/SheriffProfile/SheriffProfile';
import SheriffProfileInfoPlugin from './SheriffProfileInfoPlugin/SheriffProfileInfoPlugin';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { getSheriff } from '../modules/sheriffs/selectors';

interface SheriffProfileStateProps {
    form:string;
    initialValues?: any;    
}

const SheriffProfileForm = reduxForm<any, SheriffProfileProps>({})(SheriffProfileComponent);

export default class extends connect<SheriffProfileStateProps, {}, SheriffProfileProps, RootState>(
    (state, props) => {
        return {
            form: props.sheriffId ? 'EditSheriff' : 'CreateSheriff',
            initialValues: {
                sheriff: getSheriff(props.sheriffId)(state)
            }
        }
    }
)(SheriffProfileForm as any)
{
    static defaultProps: Partial<SheriffProfileProps> = {
        plugins: [
            new SheriffProfileInfoPlugin()
        ]
    };
}
