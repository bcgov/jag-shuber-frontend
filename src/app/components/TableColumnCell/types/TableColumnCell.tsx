import * as React from 'react';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../../api';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<any>>;
    model: Partial<any>;
    fieldInstanceName: string;
    callbackContext?: any; // TODO: Type this better...
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export default interface TableColumnCell {
    title: React.ReactNode;
    colStyle?: any;
    filterable?: boolean;
    filterComponent?: any; // TODO: Fix this... TableColumnCell type isn't working;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;

}

export interface FieldColumnOptions {
    fieldName?: string;
    displayInfo: boolean;
    disabled?: boolean;
    filterable?: boolean;
    filterComponent?: TableColumnCell;
    selectorComponent?: React.ReactType<any>;
    colStyle?: any;

}
