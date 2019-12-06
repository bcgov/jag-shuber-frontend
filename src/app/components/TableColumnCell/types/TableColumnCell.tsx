import * as React from 'react';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../../api';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    leave: Partial<Leave>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export default interface TableColumnCell {
    title: React.ReactNode;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;
}

export interface FieldColumnOptions {
    displayInfo: boolean;
    disabled?: boolean;
}
