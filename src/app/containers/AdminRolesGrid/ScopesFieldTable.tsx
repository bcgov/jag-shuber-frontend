import React from 'react';
import {
    FieldArray, FieldsProps
} from 'redux-form';

import { Leave } from '../../api';
import { Table, FormGroup, Button, Glyphicon, Well } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    leave: Partial<Leave>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

export interface DetailComponentProps {}

export const EmptyDetailRow: React.SFC<DetailComponentProps> = () => (<div />);

// TODO: This is the same as LeavesFieldTableProps... make it generic?
export interface ScopesFieldTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
    expandable?: boolean;
    expandedRows?: any[];
    rowComponent: React.SFC<DetailComponentProps>; // Not sure if this is the appropriate type
}

export default class ScopesFieldTable extends React.Component<ScopesFieldTableProps> {
    static defaultProps = {
       expandable: false,
       expandedRows: false,
        // TODO: What is up with default props?
       rowComponent: <div />
    };

    static TextFieldColumn = CellTypes.TextField;
    static TextAreaColumn = CellTypes.TextArea;
    static SelectorFieldColumn = CellTypes.SelectorField;
    static DateColumn = CellTypes.Date;
    static TimeColumn = CellTypes.Time;
    static RoleCodeColumn = CellTypes.RoleCode;
    static LeaveSubCodeColumn = CellTypes.LeaveSubCode;
    static CancelColumn = CellTypes.Cancel;

    render() {
        const {
            fieldName,
            title,
            columns = [],
            expandable = false,
            expandedRows = [],
            rowComponent,
        } = this.props;

        // return (<div>This would be the table</div>);

        const RowComponent = rowComponent;

        return (
            <FieldArray<Partial<Leave>>
                name={fieldName}
                component={({ fields }) => (
                    <div>
                        {title}
                        <Table striped={true} >
                            <thead>
                                <tr>
                                    <th></th>
                                    {columns.map((col, colIndex) => (
                                        <th className="text-left" key={colIndex}>{col.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((fieldInstanceName, index) => {
                                    const currentLeave: Partial<Leave> = fields.get(index);
                                    const { cancelDate = undefined } = currentLeave || {};
                                    // @ts-ignore
                                    return (
                                        <>
                                            <tr key={index}>
                                                {expandable && (
                                                <td>
                                                    <FormGroup>
                                                        <Button
                                                            bsStyle="link"
                                                            onClick={() => fields.remove(index)}
                                                            style={{ color: '#666666' }}
                                                        >
                                                            <Glyphicon glyph="triangle-right" />
                                                        </Button>
                                                    </FormGroup>
                                                </td>
                                                )}
                                                {
                                                    columns
                                                        .map((col, colIndex) => {
                                                            const Column = cancelDate != undefined
                                                                ? col.CanceledRender
                                                                : col.FormRenderer;
                                                            return (
                                                                <td key={colIndex}>
                                                                    <Column
                                                                        leave={currentLeave}
                                                                        fieldInstanceName={fieldInstanceName}
                                                                        fields={fields}
                                                                        index={index}
                                                                    />
                                                                </td>
                                                            );
                                                        })
                                                }
                                            </tr>
                                            {expandable && expandedRows.indexOf(index + 1) > -1 && (
                                            <tr key={index * 2}>
                                                <td>{/* Nest the table for sub-rows */}</td>
                                                <td colSpan={expandable ? columns.length : columns.length - 1}>
                                                    <RowComponent />
                                                </td>
                                            </tr>
                                            )}
                                        </>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={expandable ? columns.length : columns.length - 1}></td>
                                    <td colSpan={1}>
                                        <Button onClick={() => fields.push({} as any)}>
                                            <Glyphicon glyph="plus" /> Create New Role
                                        </Button>
                                    </td>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                )}
            />
        );
    }

}
