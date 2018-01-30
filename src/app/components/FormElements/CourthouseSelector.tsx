import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
import { COURTHOUSES } from '../../api';


export default class CourthouseSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No courthouse selected">{`Select ${label}`}</option>
                    {Object.keys(COURTHOUSES).map((k, i)=><option value={COURTHOUSES[k]}>{COURTHOUSES[k]}</option>)}
                </FormControl>
            </FormFieldWrapper>
        );
    }
}