import * as React from 'react';
import { Checkbox } from 'react-bootstrap';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';

export default class CheckboxField extends React.PureComponent<FormFieldWrapperProps> {
    render() {
        const {input: {value, onChange}, label} = this.props;

        return (
            <FormFieldWrapper {...this.props} showLabel={false}>
                <Checkbox
                    onChange={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // TODO: Something is making modals close on first click
                        //       we might have to store activeModal ids in redux store
                        onChange(e);
                    }}
                    checked={value}>
                    {label}
                </Checkbox>
            </FormFieldWrapper>

        );
    }
}
