import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';

export interface SelectorProps {
    data: {key:string|number, value:string}[]; 
}

export default class Selector extends React.PureComponent<FormFieldWrapperProps & SelectorProps>{
    render(){
        const { input:{value, onChange}, label, data} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option>{`Select ${label}`}</option>
                    {data.map((keyValue, index)=><option value={keyValue.key}>{keyValue.value}</option>)}
                </FormControl>
            </FormFieldWrapper>
        );
    }
}