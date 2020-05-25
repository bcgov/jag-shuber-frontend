import React from 'react';
import {
    FieldArray, WrappedFieldArrayProps
} from 'redux-form';

import * as CellTypes from './TableColumnCell';
import DataTableTable, { DataTableTableProps } from './DataTableTable';
import { DataTableDetailComponentProps } from './DataTableDetail';
import { DataTableModalComponentProps } from './DataTableModal';
import DataTableFilters from './DataTableFilters';

export const EmptyDetailRow: React.SFC<DataTableDetailComponentProps> = () => (<div />);

// TODO: This is the same as LeavesFieldTableProps... make the other one use a generic?
export interface DataTableProps {
    title: React.ReactNode;
    buttonLabel?: React.ReactNode; // TODO... a hash of values maybe :)
    fieldName: string;
    columns: CellTypes.Types.TableColumnCell[];
    actionsColumn?: CellTypes.Types.TableColumnCell;
    displayHeaderActions?: boolean;
    displayHeaderSave?: boolean;
    // TODO: It would be preferable to supply header actions the same way we use actionsColumn...
    onResetClicked?: Function;

    displayActionsColumn?: boolean;
    expandable?: boolean;
    expandedRows?: Set<number>;
    modalProps?: any;
    modalComponent: React.ReactType<DataTableModalComponentProps>;
    rowComponent: React.SFC<DataTableDetailComponentProps>;
    shouldRenderRow?: (model: any) => boolean;
    shouldDisableRow?: (model: any) => boolean;
    shouldMarkRowAsDeleted?: (model: any) => boolean;
    initialValue?: any;
    filterable?: boolean;
    filterFieldName?: string;
    showExpiredFilter?: boolean;
    onToggleExpiredClicked?: Function;
    filterRows?: Function;
    groupBy?: any;
    sortBy?: string[]; // TODO: Not implemented yet
    shouldSortBy?: (col: any, colIndex: number) => boolean; // TODO: Not implemented yet
}

export default class DataTable<T> extends React.Component<DataTableProps> {
    static defaultProps = {
        displayHeaderActions: false,
        displayHeaderSave: true,
        // TODO: It would be preferable to supply header actions the same way we use actionsColumn...
        onResetClicked: () => {},
        onToggleExpiredClicked: () => {},
        displayActionsColumn: true,
        expandable: false,
        // expandedRows: false,
        // TODO: What is up with default props?
        rowComponent: <div />,
        shouldRenderRow: (model: any) => true,
        shouldDisableRow: (model: any) => false,
        shouldMarkRowAsDeleted: (model: any) => false,
        modalProps: {},
        modalComponent: <div />,
        actionsColumn: null,
        buttonLabel: 'Create',
        initialValue: {},
        filterable: false,
        showExpiredFilter: false,
        filterRows: () => true
    };

    // TODO: It would be cool if we could dynamically supply at least some of these types...
    static HtmlColumn = CellTypes.Html;
    static MappedTextColumn = CellTypes.MappedText;
    static StaticTextColumn = CellTypes.StaticText;
    static StaticDateColumn = CellTypes.StaticDate;
    static TextFieldColumn = CellTypes.TextField;
    static TextAreaColumn = CellTypes.TextArea;
    static SelectorFieldColumn = CellTypes.SelectorField;
    static CheckboxColumn = CellTypes.Checkbox;
    static DateColumn = CellTypes.Date;
    static TimeColumn = CellTypes.Time;
    static SortOrderColumn = CellTypes.SortOrder;
    static RoleCodeColumn = CellTypes.RoleCode;
    static LeaveSubCodeColumn = CellTypes.LeaveSubCode;
    static ButtonColumn = CellTypes.Button;
    static CancelColumn = CellTypes.Cancel;

    static ActionsColumn = CellTypes.Actions;

    component?: any = null;

    constructor(props: DataTableProps) {
        super(props);
    }

    renderTable = (props: WrappedFieldArrayProps<any>) => {
        return (
            <DataTableTable
                ref={(dt) => this.component = dt}
                {...props}
                {...this.props}
            />
        );
    }

    render() {
        const {
            columns,
            fieldName,
            filterFieldName,
            title,
            displayActionsColumn,
            expandable,
            filterable,
            groupBy,
            showExpiredFilter,
            onToggleExpiredClicked,
            onResetClicked
        } = this.props;

        return (
            <div className="data-table">
                {title}
                {filterable && filterFieldName && (
                    <DataTableFilters
                        columns={columns}
                        displayActionsColumn={displayActionsColumn}
                        expandable={expandable}
                        filterable={filterable}
                        groupBy={groupBy}
                        filterFieldName={filterFieldName}
                        showExpiredFilter={showExpiredFilter}
                        onToggleExpiredClicked={onToggleExpiredClicked}
                        onResetClicked={onResetClicked}
                    />
                )}
                <FieldArray<Partial<any & T>>
                    name={fieldName}
                    component={this.renderTable}
                />
            </div>
        );
    }
}
