import * as React from 'react';
import * as EnumUtils from '../../infrastructure/EnumUtils';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { DaysOfWeek } from '../../api';



export default class DaysOfWeekChecklist extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const { input: { onChange } } = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <br/>{EnumUtils.getEnumKeysAsStrings(DaysOfWeek).filter( k => k != 'Weekdays' && k != 'Everyday').map((k) =>
                    <Checkbox inline onChange={onChange} value={k}>{k}</Checkbox>)} {' '}
            </FormFieldWrapper>

        );
    }
}