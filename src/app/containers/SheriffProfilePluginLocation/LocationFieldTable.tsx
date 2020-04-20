import * as React from 'react';
import moment from 'moment';
import {
    FieldArray, Field, FieldsProps
} from 'redux-form';
import { SheriffLocation } from '../../api/Api';
import { Table, Button, Glyphicon } from 'react-bootstrap';
import DateField from '../../components/FormElements/DateField';
import SelectorField from '../../components/FormElements/SelectorField';
import LeavePersonalSubCodeSelector from '../LeavePersonalSubCodeSelector';
// import CancelLocationButton from '../CancelLocationButton';
import LeaveCancelledPopover from '../../components/LeaveCancelledPopover';
import TimePickerDropDownField from '../../components/FormElements/TimePickerDropDownField';
import { fromTimeString, toTimeString } from 'jag-shuber-api';
import LocationDisplay from '../LocationDisplay';
import LocationSelector from '../LocationSelector';

import { ColumnRendererProps } from '../../components/TableColumn';

export type ColumnRenderer = React.ComponentType<ColumnRendererProps & { location: Partial<SheriffLocation> }>;

export interface SheriffLocationFieldTableColumn {
    title: React.ReactNode;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;
}

export interface SheriffLocationFieldTableProps {
    title: React.ReactNode;
    fieldName: string;
    columns: SheriffLocationFieldTableColumn[];
}

export default class SheriffLocationFieldTable extends React.Component<SheriffLocationFieldTableProps>{

    static CancelColumn: SheriffLocationFieldTableColumn = {
        title: '',
        FormRenderer: ({ fields, index, location: { id } }) => (
            <Button
                bsStyle="link"
                onClick={() => fields.remove(index)}
                style={{ color: '#666666' }}
            >
                <Glyphicon glyph="remove" />
            </Button>
        ),
        CanceledRender: ({ location }) => (
            null // CanceledRender not needed
        )
    };

    static LocationColumn(): SheriffLocationFieldTableColumn {
        return {
            title: 'Location',
            FormRenderer: ({ fieldInstanceName }) => (
                <Field
                    name={`${fieldInstanceName}.locationId`}
                    component={(p) => <SelectorField
                        {...p}
                        showLabel={false}
                        SelectorComponent={
                            (sp) => <LocationSelector {...sp} />}
                    />}
                    label="Type"
                />
            ),
            CanceledRender: ({ location }) => (
                <LocationDisplay id={location.locationId} />
            )
        };
    }

    static DateColumn(label: string, fieldName: string): SheriffLocationFieldTableColumn {
        return {
            title: label,
            FormRenderer: ({ fieldInstanceName }) => (
                <Field
                    name={`${fieldInstanceName}.${fieldName}`}
                    component={DateField as any}
                    label={label}
                />
            ),
            CanceledRender: ({ location }) => (
                <span>
                    {moment(location[fieldName]).format('MMM D, YYYY')}
                </span>
            )
        };
    }

    static TimeColumn(label: string, nullTimeLabel: string, fieldName: string): SheriffLocationFieldTableColumn {
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
            CanceledRender: ({ location }) => (
                <span>
                    {fromTimeString(location[fieldName]).format('HH:mm')}
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
            <FieldArray<Partial<SheriffLocation>>
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
                                    const currentLocation: Partial<SheriffLocation> = fields.get(index);
                                    const { cancelDate = undefined } = currentLocation || {};
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
                                                                    location={currentLocation}
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
