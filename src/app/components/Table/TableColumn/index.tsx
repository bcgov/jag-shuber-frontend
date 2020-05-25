import { FieldsProps } from 'redux-form';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<any>>;
    fieldInstanceName: string;
    model?: Partial<any>;
    callbackContext?: any;
    disabled?: boolean;
    actions?: any;
}
