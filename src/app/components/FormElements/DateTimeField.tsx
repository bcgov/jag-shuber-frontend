import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface DateTimeFieldProps {
    defaultValue?: string;
}

export default class DateTimeield extends React.PureComponent<FormFieldWrapperProps & DateTimeFieldProps>{
    render(){
        const {input:{value, onChange}, defaultValue=moment().startOf('day').add(9, 'hours')} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime  dateFormat="MMM DD YYYY" closeOnSelect={false} value={value} onChange={onChange} defaultValue={defaultValue}/>
            </FormFieldWrapper>
        );
    }
}