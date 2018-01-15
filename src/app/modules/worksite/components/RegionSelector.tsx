import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from '../../../components/Form/FormFieldWrapper';
import { FormControl } from 'react-bootstrap';


export default class RegionSelector extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const { input:{value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No region selected">{`Select ${label}`}</option>
                    <option value="Interior">Interior</option>
                    <option value="Lower Mainland">Lower Mainland</option>
                    <option value="North">North</option>
                    <option value="Vancouver Island">Vancouver Island</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}