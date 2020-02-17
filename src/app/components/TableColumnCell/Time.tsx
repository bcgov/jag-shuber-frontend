import * as React from 'react';
import { Field } from 'redux-form';

import * as Types from './types';

import TimePickerDropDownField from '../../components/FormElements/TimePickerDropDownField';

import { fromTimeString, toTimeString } from 'jag-shuber-api';

// TODO: This column doesn't have options?
const TimeColumn = (label: string, nullTimeLabel: string, fieldName: string): Types.TableColumnCell => {
    return {
        title: label,
        FormRenderer: ({ fieldInstanceName , disabled}) => (
            <Field
                name={`${fieldInstanceName}.${fieldName}`}
                component={
                    (p) => {
                        return (
                            <TimePickerDropDownField
                                {...p}
                                nullTimeLabel={nullTimeLabel}
                                timeIncrement={15}
                            />
                        );
                    }
                }
                label={label}
                format={(val) => val ? fromTimeString(val) : undefined}
                normalize={(val) => toTimeString(val)}
            />
        ),
        CanceledRender: ({ model }) => {
            if (!model) return null;
            return (
                <span>
                    {fromTimeString(model[fieldName]).format('HH:mm')}
                </span>
            );
        }
    };
};

export default TimeColumn;
