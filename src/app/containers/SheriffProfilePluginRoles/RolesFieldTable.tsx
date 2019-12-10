import * as React from 'react';
import {
    FieldArray, FieldsProps
} from 'redux-form';

import { Leave } from '../../api';
import { Table, Button, Glyphicon } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

// TODO: This is the same as LeavesFieldTableProps... make it generic?
export interface DataTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
}

export default class DataTable extends React.Component<DataTableProps> {
    static CancelColumn = CellTypes.Cancel;
    static LeaveSubCodeColumn = CellTypes.LeaveSubCode;
    static RoleCodeColumn = CellTypes.RoleCode;
    static DateColumn = CellTypes.Date;
    static TimeColumn = CellTypes.Time;

    render() {
        const {
            fieldName,
            title,
            columns = []
        } = this.props;

        return (
            <FieldArray<Partial<Leave>>
                name={fieldName}
                component={({ fields }) => (
                    <div>
                        {title}
                        <Table striped={true} >
                            <thead>
                                <tr>
                                    {columns.map((col, colIndex) => (
                                        <th className="text-left" key={colIndex}>{col.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((fieldInstanceName, index) => {
                                    const currentLeave: Partial<Leave> = fields.get(index);
                                    const { cancelDate = undefined } = currentLeave || {};
                                    return (
                                        <tr key={index}>
                                            {
                                                columns
                                                    .map((col, colIndex) => {
                                                        const Column = cancelDate != undefined
                                                            ? col.CanceledRender
                                                            : col.FormRenderer;
                                                        return (
                                                            <td key={colIndex}>
                                                                {/* TODO: Fix me! This needs to be converted to use new model prop? */}
                                                                {/*<Column
                                                                    leave={currentLeave}
                                                                    fieldInstanceName={fieldInstanceName}
                                                                    fields={fields}
                                                                    index={index}
                                                                />*/}
                                                            </td>
                                                        );
                                                    })
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <Button onClick={() => fields.push({} as any)}>
                                            <Glyphicon glyph="plus" />
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
