import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './Form/FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
import { TRAINING_TYPES } from '../api';


export default class TrainingTypeSelector extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { value, onChange }, label } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <FormControl componentClass="select" value={value} onChange={onChange}>
                    <option value="No training type selected">{`Select ${label}`}</option>
                    <option value="CEW">{TRAINING_TYPES.CEW}</option>
                    <option value="CID">{TRAINING_TYPES.CID}</option>
                    <option value="FRO">{TRAINING_TYPES.FRO}</option>
                    <option value="PISTOL">{TRAINING_TYPES.PISTOL}</option>
                </FormControl>
            </FormFieldWrapper>
        );
    }
}