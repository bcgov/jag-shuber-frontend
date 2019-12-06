import React from 'react';
import {
    FieldArray, FieldsProps
} from 'redux-form';

import { Leave } from '../../api';
import { Table, FormGroup, Button, Glyphicon, Well } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';
import CancelColumn from '../../components/TableColumnCell/Cancel';
import AdminRolePermissionsModal from './AdminRolePermissionsModal';

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
export interface RolesFieldTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
    displayHeaderActions?: boolean;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    expandedRows?: Set<number>;
    rowComponent: React.SFC<DetailComponentProps>; // Not sure if this is the appropriate type
}

export default class RolesFieldTable extends React.Component<RolesFieldTableProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayActionsColumn: true,
        expandable: false,
        // expandedRows: false,
        // TODO: What is up with default props?
       rowComponent: <div />
    };

    static TextFieldColumn = CellTypes.TextField;
    static TextAreaColumn = CellTypes.TextArea;
    static SelectorFieldColumn = CellTypes.SelectorField;
    static CheckboxColumn = CellTypes.Checkbox;
    static DateColumn = CellTypes.Date;
    static TimeColumn = CellTypes.Time;
    static RoleCodeColumn = CellTypes.RoleCode;
    static LeaveSubCodeColumn = CellTypes.LeaveSubCode;
    static ButtonColumn = CellTypes.Button;
    static CancelColumn = CellTypes.Cancel;
    static ActionsColumn = CellTypes.Actions;

    state = {
        expandedRows: new Set(),
        activeRoleScopeId: null,
        isPermissionsModalOpen: false
    };

    constructor(props: RolesFieldTableProps) {
        super(props);
    }

    onExpandRowClicked(rowIdx: number) {
        const { expandedRows } = this.state;

        if (!expandedRows.has(rowIdx)) {
            expandedRows.add(rowIdx);
        } else {
            expandedRows.delete(rowIdx);
        }

        this.setState({
            expandedRows: expandedRows
        });
    }

    setActiveRoleScope(id: any) {
        this.setState({
            activeRoleScopeId: id
        });
    }

    // @ts-ignore
    render() {
        const componentInstance = this;

        const {
            fieldName,
            title,
            columns = [],
            displayHeaderActions = false,
            displayActionsColumn = true,
            expandable = false,
            rowComponent,
        } = this.props;

        const {
            expandedRows,
            isPermissionsModalOpen,
            activeRoleScopeId
        } = this.state;

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
                                    {expandable && (<th />)}
                                    {columns.map((col, colIndex) => (
                                        <th className="text-left" key={colIndex}>{col.title}</th>
                                    ))}

                                    {displayActionsColumn && (
                                    <th
                                        style={{
                                            width: '100px'
                                        }}
                                    >
                                        {displayHeaderActions && (
                                        <Button onClick={() => fields.push({} as any)} style={{ float: 'right' }}>
                                            <Glyphicon glyph="plus" /> Create Role
                                        </Button>
                                        )}
                                    </th>
                                    )}
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
                                                            onClick={() => this.onExpandRowClicked(index)}
                                                            style={{ color: '#666666' }}
                                                        >
                                                            {expandedRows && !expandedRows.has(index) && (
                                                            <Glyphicon glyph="triangle-right" />
                                                            )}
                                                            {expandedRows && expandedRows.has(index) && (
                                                            <Glyphicon glyph="triangle-bottom" />
                                                            )}
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
                                                                        callbackContext={componentInstance}
                                                                    />
                                                                </td>
                                                            );
                                                        })
                                                }
                                                {displayActionsColumn && (() => {
                                                    const actionsColumn = CellTypes.Actions();

                                                    const Column = cancelDate != undefined
                                                        ? actionsColumn.CanceledRender
                                                        : actionsColumn.FormRenderer;

                                                    return (
                                                        <td style={{ display: 'flex' }}>
                                                            <Column
                                                                leave={currentLeave}
                                                                fieldInstanceName={fieldInstanceName}
                                                                fields={fields}
                                                                index={index}
                                                                callbackContext={componentInstance}
                                                            />
                                                        </td>
                                                    );
                                                })()}
                                            </tr>
                                            {expandable && expandedRows && expandedRows.has(index) && (
                                            <tr key={index * 2}>
                                                <td>{/* Nest the table for sub-rows */}</td>
                                                {/* tslint:disable-next-line:max-line-length */}
                                                <td style={{ margin: '0', padding: '0' }} colSpan={expandable ? columns.length + 1 : columns.length}>
                                                    <RowComponent />
                                                </td>
                                            </tr>
                                            )}
                                        </>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <AdminRolePermissionsModal isOpen={(activeRoleScopeId !== null)} />
                    </div>
                )}
            />
        );
    }

}
