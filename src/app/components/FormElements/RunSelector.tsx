import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { RUNS } from '../../api';
import Selector from './Selector';


export default class RunSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){        
        const data = Object.keys(RUNS).map((key, index)=>({key, value:RUNS[key]}));
        return (
            <Selector data={data} {...this.props}/>
        );
    }
}