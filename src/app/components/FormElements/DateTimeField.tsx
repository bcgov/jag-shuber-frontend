import * as React from 'react';
import * as moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export default class DateTimeField extends React.PureComponent<FormFieldWrapperProps>{
    render(){
        const {input:{value, onChange}} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <DateTime  dateFormat="MMM DD YYYY" closeOnSelect={false} value={moment(value)} onChange={onChange} />
            </FormFieldWrapper>
        );
    }
}