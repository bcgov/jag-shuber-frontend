import React from 'react';
import {
    Field,
    FieldArray, FieldsProps
} from 'redux-form';

// TODO: This has to be generic!
import { Role } from '../../api';

import { Table, FormGroup, Button, Glyphicon, Well } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';
// TODO: Move this into a common location with AdminForm
import HeaderSaveButton from '../../containers/AdminRolesGrid/HeaderSaveButton';
import TextField from '../FormElements/TextField';
import { FieldColumnOptions } from '../TableColumnCell/types';

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

// TODO: This is the same as LeavesFieldTableProps... make it generic?
export interface DataTableProps {
    title: React.ReactNode;
    buttonLabel?: React.ReactNode; // TODO... a hash of values maybe :)
    fieldName: string;
    filterFieldName?: string;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    displayActionsColumn?: boolean;
    expandable?: boolean;
    expandedRows?: Set<number>;
    // TODO: Rename as detailComponent
    rowComponent: React.ReactType<DetailComponentProps>;
    modalProps?: any;
    modalComponent: React.ReactType<ModalComponentProps>;

    initialValue?: any;
    filterable?: boolean;
    filterRows?: Function;
}

export default class DataTable<T> extends React.Component<DataTableProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        displayActionsColumn: true,
        expandable: false,
        // expandedRows: false,
        // TODO: What is up with default props?
        rowComponent: <div />,
        modalProps: {},
        modalComponent: <div />,
        actionsColumn: null,
        buttonLabel: 'Create',
        initialValue: {},
        filterable: false,
        filterRows: () => true
    };

    static MappedTextColumn = CellTypes.MappedText;
    static StaticTextColumn = CellTypes.StaticText;
    static StaticDateColumn = CellTypes.StaticDate;
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
        activeRowId: null,
        isModalOpen: false
    };

    constructor(props: DataTableProps) {
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

    setActiveRow(id: any) {
        this.setState({
            activeRowId: id
        });
    }

    // @ts-ignore
    render() {
        const componentInstance = this;

        const {
            fieldName,
            filterFieldName,
            title,
            buttonLabel,
            columns = [],
            actionsColumn,
            displayHeaderActions = false,
            displayHeaderSave = true,
            displayActionsColumn = true,
            expandable = false,
            rowComponent,
            modalProps,
            modalComponent,
            initialValue,
            filterable,
            filterRows,
        } = this.props;

        const {
            expandedRows,
            isModalOpen,
            activeRowId
        } = this.state;

        // return (<div>This would be the Table</div>);

        // TODO: Rename as detail component, cause that's what this really is...
        const RowComponent = rowComponent;
        const ModalComponent = modalComponent;

        return (

            <div>
                {title}
                <FieldArray<Partial<any & T>>
                    name={fieldName}
                    component={(props) => {
                        const {fields} = props;
                        return (
                            <Table striped={true} style={{tableLayout: 'fixed', width: '100%'}}>
                                <thead>
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
                                {filterable && filterFieldName && (
                                    <FieldArray<Partial<any & T>>
                                        name={filterFieldName}
                                        component={() => {
                                            return (
                                                <tr style={{backgroundColor: '#eee'}}>
                                                    {expandable && (<th style={{width: '60px'}}/>)}
                                                    {columns.map((col, colIndex) => {
                                                        const Column = (col.filterComponent)
                                                            ? col.filterComponent().FormRenderer
                                                            : col.FormRenderer;

                                                        return (
                                                            <th className="text-left" key={colIndex}
                                                                style={col.colStyle}>
                                                                {col.filterable && (
                                                                    <div
                                                                        style={{display: 'flex', alignItems: 'center'}}>
                                                                        <Column
                                                                            model={{test: 'test'}}
                                                                            fieldInstanceName={`fieldName_${Math.random().toString()}`}
                                                                            fields={fields}
                                                                            index={0}
                                                                            callbackContext={componentInstance}
                                                                        />
                                                                        <div className="form-group"
                                                                             style={{marginLeft: '0.5rem'}}>
                                                                            <Glyphicon glyph="filter"/>
                                                                            {/* TODO: Change this to 'ban' icon if filter is set */}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </th>
                                                        );
                                                    })}

                                                    {displayActionsColumn && (
                                                        <th
                                                            style={{
                                                                width: '250px'
                                                            }}
                                                        />
                                                    )}
                                                </tr>
                                            );
                                        }}
                                    />
                                )}
                                </thead>

                                <tbody>
                                {fields.length === 0 && (
                                    <tr>
                                        <td colSpan={expandable ? columns.length + 2 : columns.length + 1}>
                                            <Well
                                                style={{textAlign: 'center'}}>No records found.</Well></td>
                                    </tr>
                                )}
                                {fields.length > 0 && fields.map((fieldInstanceName, index) => {
                                    const fieldModel: Partial<any & T> = fields.get(index);
                                    const {id = null, cancelDate = undefined} = fieldModel || {};

                                    return (
                                        <>
                                            <tr key={index}>
                                                {expandable && (
                                                    <td>
                                                        <FormGroup>
                                                            <Button
                                                                bsStyle="link"
                                                                onClick={() => this.onExpandRowClicked(index)}
                                                                style={{color: '#666666'}}
                                                            >
                                                                {id && expandedRows && !expandedRows.has(index) && (
                                                                    <Glyphicon glyph="triangle-right"/>
                                                                )}
                                                                {id && expandedRows && expandedRows.has(index) && (
                                                                    <Glyphicon glyph="triangle-bottom"/>
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
                                                                        model={fieldModel}
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
                                                    const rowActionsColumn = actionsColumn || CellTypes.Actions();

                                                    const Column = cancelDate != undefined
                                                        ? rowActionsColumn.CanceledRender
                                                        : rowActionsColumn.FormRenderer;

                                                    // TODO: Make this use a class?
                                                    // Flex align end to make sure buttons are right-aligned
                                                    return (
                                                        <td style={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-end'
                                                        }}>
                                                            <Column
                                                                model={fieldModel}
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
                                                    <td>{/* Nest the Table for sub-rows */}</td>
                                                    {/* tslint:disable-next-line:max-line-length */}
                                                    <td style={{margin: '0', padding: '0'}}
                                                        colSpan={expandable ? columns.length + 1 : columns.length}>
                                                        <RowComponent
                                                            parentModel={fieldModel}
                                                            parentModelId={fieldModel.id}
                                                        />
                                                    </td>
                                                </tr>
                                            )}
                                            <ModalComponent
                                                isOpen={activeRowId && (activeRowId === fieldModel.id)}
                                                {...modalProps}
                                                parentModel={fieldModel}
                                                parentModelId={fieldModel.id}
                                            />
                                        </>
                                    );
                                })}
                                </tbody>
                            </Table>
                        );
                    }}
                />
            </div>
        );
    }

}
