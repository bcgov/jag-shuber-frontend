import * as React from 'react';
import {
    FieldArray, FieldsProps
} from 'redux-form';

import { Leave } from '../../api';
import { Table, Button, Glyphicon } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    leave: Partial<Leave>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

// TODO: This is the same as LeavesFieldTableProps... make it generic?
export interface RolesFieldTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
}

export default class RolesFieldTable extends React.Component<RolesFieldTableProps> {
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

        return (<div>This would be the table</div>);

        /*return (
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
        );*/
    }

}
