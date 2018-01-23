import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
import { TRAINING_TYPES } from '../../api';


export default class TrainingTypeSelector extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { value, onChange }, label } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No training type selected">{`Select ${label}`}</option>
                    {Object.keys(TRAINING_TYPES).map((k, i)=><option value={k}>{TRAINING_TYPES[k]}</option>)}
                </FormControl>
            </FormFieldWrapper>
        );
    }
}