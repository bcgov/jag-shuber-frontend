import * as React from 'react';
import moment from 'moment';
import {
    FieldArray, Field, FieldsProps
} from 'redux-form';
import { Leave } from '../../api/Api';
import { Table, Button, Glyphicon, Well } from 'react-bootstrap';
import DateField from '../../components/FormElements/DateField';
import SelectorField from '../../components/FormElements/SelectorField';
import LeavePersonalSubCodeSelector from '../LeavePersonalSubCodeSelector';
import CancelLeaveButton from '../CancelLeaveButton';
import LeaveCancelledPopover from '../../components/LeaveCancelledPopover';
import TimePickerDropDownField from '../../components/FormElements/TimePickerDropDownField';
import { fromTimeString, toTimeString } from 'jag-shuber-api';
import LeaveSubCodeDisplay from '../LeaveSubCodeDisplay';
import LeaveTrainingSubCodeSelector from '../LeaveTrainingSubCodeSelector';

import { ColumnRendererProps } from '../../components/Table/TableColumn';

export type ColumnRenderer = React.ComponentType<ColumnRendererProps & { leave: Partial<Leave> }>;

export interface LeavesFieldTableColumn {
    title: React.ReactNode;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;
}

export interface LeavesFieldTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: LeavesFieldTableColumn[];
}

export default class LeavesFieldTable extends React.Component<LeavesFieldTableProps>{

    static CancelColumn: LeavesFieldTableColumn = {
        title: '',
        FormRenderer: ({ fields, index, leave: { id } }) => (
            !id ?
                (
                    <Button
                        bsStyle="link"
                        onClick={() => fields.remove(index)}
                        style={{ color: '#666666' }}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                )
                :
                <CancelLeaveButton leaveId={id} />
        ),
        CanceledRender: ({ leave }) => (
            <LeaveCancelledPopover leave={leave} />
        )
    };

    static LeaveSubCodeColumn(isPersonal: boolean): LeavesFieldTableColumn {
        return {
            title: 'Type',
            FormRenderer: ({ fieldInstanceName }) => (
                <Field
                    name={`${fieldInstanceName}.leaveSubCode`}
                    component={(p) => <SelectorField
                        {...p}
                        showLabel={false}
                        SelectorComponent={
                            (sp) =>
                                isPersonal
                                ? <LeavePersonalSubCodeSelector {...sp} />
                                : <LeaveTrainingSubCodeSelector {...sp} />
                            }
                    />}
                    label="Type"
                />
            ),
            CanceledRender: ({ leave }) => (
                <LeaveSubCodeDisplay subCode={leave.leaveSubCode} />
            )
        };
    }

    static DateColumn(label: string, fieldName: string): LeavesFieldTableColumn {
        return {
            title: label,
            FormRenderer: ({ fieldInstanceName }) => (
                <Field
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={DateField as any}
                    label={label}
                />
            ),
            CanceledRender: ({ leave }) => (
                <span>
                    {moment(leave[fieldName]).format('MMM D, YYYY')}
                </span>
            )
        };
    }

    static TimeColumn(label: string, nullTimeLabel: string, fieldName: string): LeavesFieldTableColumn {
        return {
            title: label,
            FormRenderer: ({ fieldInstanceName }) => (
                <Field
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={
                        (p) => {
                            return (
                                <TimePickerDropDownField
                                    {...p}
                                    nullTimeLabel={nullTimeLabel}
                                    timeIncrement={15}
                                />
                            );
                        }
                    }
                    label={label}
                    format={(val) => val ? fromTimeString(val) : undefined}
                    normalize={(val) => toTimeString(val)}
                />
            ),
            CanceledRender: ({ leave }) => (
                <span>
                    {fromTimeString(leave[fieldName]).format('HH:mm')}
                </span>
            )
        };
    }

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
                                {fields.length === 0 && (
                                    <tr>
                                        <td>
                                            <Well style={{textAlign: 'center'}}>No records found.</Well>
                                        </td>
                                    </tr>
                                )}
                                {fields.length > 0 && fields.map((fieldInstanceName, index) => {
                                    const currentLeave: Partial<Leave> = fields.get(index);
                                    const { cancelDate = undefined } = currentLeave || {};
                                    return (
                                        <tr key={index}>
                                            {
                                                columns
                                                    .map((col, colIndex) => {
                                                        const Column = cancelDate !== undefined
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
        );
    }

}
