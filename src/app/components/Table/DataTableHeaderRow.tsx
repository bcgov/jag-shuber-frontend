import React from 'react';
import { FieldsProps } from 'redux-form';

import { Button, Glyphicon } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

import HeaderSaveButton from '../../containers/AdminRolesGrid/HeaderSaveButton';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<any>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export interface DetailComponentProps {
    parentModel?: any;
    parentModelId?: any;
}

export interface ModalComponentProps {}

export const EmptyDetailRow: React.SFC<DetailComponentProps> = () => (<div />);

// TODO: This is the same as LeavesFieldTableProps... make the other one use a generic?
export interface DataTableHeaderRowProps {
    columns: CellTypes.Types.TableColumnCell[];
    fields: FieldsProps<Partial<any>>;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    buttonLabel?: React.ReactNode;
    initialValue?: any;
    filterable?: boolean;
    filterRows?: Function;
}

export default class DataTableHeaderRow<T> extends React.Component<DataTableHeaderRowProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        displayActionsColumn: true,
        expandable: false,
        // expandedRows: false,
        buttonLabel: 'Create',
        initialValue: {},
        filterable: false,
        filterRows: () => true
    };

    // @ts-ignore
    render() {
        const {
            buttonLabel,
            columns = [],
            fields,
            displayHeaderActions = false,
            displayHeaderSave = true,
            displayActionsColumn = true,
            expandable = false,
            initialValue
        } = this.props;

        return (

            <tr>
                {expandable && (<th style={{width: '60px'}}/>)}
                {columns.map((col, colIndex) => (
                    <th className="text-left" key={colIndex} style={col.colStyle}>
                        {col.title}&nbsp;{col.displayInfo && (<Glyphicon glyph="info-sign"/>)}
                    </th>
                ))}

                {displayActionsColumn && (
                    <th
                        style={{
                            width: '250px'
                        }}
                    >
                        {displayHeaderActions && (

                            <>
                                {displayHeaderSave && (
                                    <HeaderSaveButton formName={'AdminForm'}/>
                                )}
                                <Button
                                    onClick={() => fields.push(initialValue as T)}
                                    style={{float: 'right'}}>
                                    <Glyphicon glyph="plus"/> {buttonLabel}
                                </Button>
                            </>
                        )}
                    </th>
                )}
            </tr>
        );
    }

}
