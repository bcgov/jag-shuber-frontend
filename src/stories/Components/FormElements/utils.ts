import { action } from '@storybook/addon-actions';
import {
    WrappedFieldProps,
    WrappedFieldInputProps,
    WrappedFieldMetaProps
} from 'redux-form';

export function generateFieldProps(inputOverrides: Partial<WrappedFieldInputProps> = {}, metaOverrides: Partial<WrappedFieldMetaProps> = {}): WrappedFieldProps {
    const defaultProps: WrappedFieldProps = {
        input: {
            checked: false,
            name: 'unnamed',
            value: undefined,
            onBlur: action("blur"),
            onChange: action("change"),
            onDragStart: action("dragStart"),
            onDrop: action("drop"),
            onFocus: action("blur")
        },
        meta: {
            active: false,
            autofilled: false,
            asyncValidating: false,
            dirty: false,
            dispatch: () => { },
            error: undefined,
            form: 'someFormName',
            initial: undefined,
            invalid: false,
            pristine: false,
            submitting: false,
            submitFailed: false,
            touched: false,
            valid: false,
            visited: false,
            warning: undefined
        }
    }
    defaultProps.input = Object.assign(defaultProps.input, inputOverrides);
    defaultProps.meta = Object.assign(defaultProps.meta, metaOverrides);
    return defaultProps;
}

export const fieldProps = generateFieldProps();
export const errorFieldProps = generateFieldProps({}, { error: "Error With something", touched: true })
export const warningFieldProps = generateFieldProps({}, { warning: "Warning With something", touched: true })
