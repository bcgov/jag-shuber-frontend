import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
import { REGION } from '../../../api'


export default class RegionSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No region selected">{`Select ${label}`}</option>
                    {Object.keys(REGION).map((k, i)=><option value={REGION[k]}>{REGION[k]}</option>)}
                </FormControl>
            </FormFieldWrapper>
        );
    }
}