import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { JAIL_ROLES } from '../../api';
import Selector from './Selector';


export default class JailRoleSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){        
        const data = Object.keys(JAIL_ROLES).map((key, index)=>({key, value:JAIL_ROLES[key]}));
        return (
            <Selector data={data} {...this.props}/>
        );
    }
}