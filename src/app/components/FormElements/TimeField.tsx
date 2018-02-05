import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface TimeFieldProps {
    defaultValue?: string;
}

export default class TimeField extends React.PureComponent<FormFieldWrapperProps & TimeFieldProps>{
    render(){
        const {input:{value, onChange}, defaultValue="12:00 p"} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime dateFormat={false} closeOnSelect={true} value={value} onChange={onChange} defaultValue={defaultValue}/>
            </FormFieldWrapper>
        );
    }
}