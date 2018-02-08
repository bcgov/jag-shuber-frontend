import * as React from 'react';
import DateTimeField from './DateTimeField';
import { FormFieldWrapperProps } from './FormFieldWrapper';

export const DateField = (f:FormFieldWrapperProps)=><DateTimeField showDate showTime={false} closeOnSelect={true} {...f}/>;
export const DateAndTimeField = (f:FormFieldWrapperProps)=><DateTimeField showDate showTime closeOnSelect={false} {...f}/>;
export const TimeField = (f:FormFieldWrapperProps)=><DateTimeField showDate={false} showTime closeOnSelect={false} {...f}/>;

