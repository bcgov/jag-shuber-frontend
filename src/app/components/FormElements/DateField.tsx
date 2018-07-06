import React from 'react';
import moment from 'moment';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

export interface DateFieldProps {
    closeOnSelect?: boolean;
}

export default class DateField extends React.PureComponent<FormFieldWrapperProps & DateFieldProps>{
    onChange(ev: any) {
        let newValue = ev;
        if (moment.isMoment(ev)) {
            if (ev.isValid()) {
                newValue = ev.toISOString();
                this.props.input.onChange(newValue);
            }
        }
    }

    render() {
        const { input: { value }, label, closeOnSelect = true} = this.props;
        return (
            <FormFieldWrapper {...this.props} showLabel={false} >
                <DateTime
                    dateFormat={'MMM DD YYYY'}
                    timeFormat={false}
                    closeOnSelect={closeOnSelect}
                    value={moment(value)}
                    onChange={(e) => this.onChange(e)}
                    inputProps={{readOnly: true, placeholder: `Select ${label}` }}
                />
            </FormFieldWrapper>
        );
    }
}