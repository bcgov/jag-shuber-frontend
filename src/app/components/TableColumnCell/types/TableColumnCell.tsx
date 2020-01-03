import * as React from 'react';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../../api';
import * as Types from './index';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<any>>;
    model: Partial<any>;
    fieldInstanceName: string;
    callbackContext?: any;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export default interface TableColumnCell {
    title: React.ReactNode;
    fieldName?: string;
    colStyle?: any;
    filterable?: boolean;
    displayInfo?: boolean;
    filterComponent?: Types.TableColumnCell;
    filterColumn?: Function;
    onChange?: Function;
    FieldRenderer?: Function;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;

}

export interface FieldColumnOptions {
    fieldName?: string;
    displayInfo?: boolean;
    disabled?: boolean;
    placeholder?: string;
    filterable?: boolean;
    filterComponent?: TableColumnCell;
    filterColumn?: Function; // TODO: Do I absolutely need this?
    onChange?: Function; // TODO: Do I absolutely need this?
    filterSelectorComponent?: React.ReactType<any>;
    selectorComponent?: React.ReactType<any>;
    colStyle?: any;

}
