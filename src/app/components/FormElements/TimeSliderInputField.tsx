import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { FormControl } from 'react-bootstrap';
// import TimeSliderField from './TimeSliderField';

export default class TimeSliderInputField extends React.PureComponent<FormFieldWrapperProps> {
    render() {
        const {input: {value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props} showLabel={false}>
                <FormControl
                    readOnly={true} 
                    type="text" 
                    placeholder={`Enter ${label}`} 
                    value={value} 
                    onChange={onChange} 
                    onClick={() => alert('hello')} 
                />
            </FormFieldWrapper>
        );
    }
}