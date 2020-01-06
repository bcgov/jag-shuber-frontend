import React from 'react';
import { FieldsProps } from 'redux-form';

import { Button, FormGroup, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import * as CellTypes from '../../components/TableColumnCell';

import HeaderSaveButton from '../../plugins/AdminRoles/containers/HeaderSaveButton';

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
                {expandable && (
                    <th style={{width: '60px'}}>
                        <FormGroup style={{ textAlign: 'left' }}>
                            <Button
                                bsStyle="link"
                                onClick={(e) => e.preventDefault()}
                                style={{color: '#666666'}}
                            >
                                <OverlayTrigger overlay={(<Tooltip>Use the <Glyphicon glyph="triangle-right" /> to expand and collapse row details</Tooltip>)} placement={'right'}>
                                    <Glyphicon glyph="info-sign" />
                                </OverlayTrigger>
                            </Button>
                        </FormGroup>
                    </th>
                )}
                {columns.map((col, colIndex) => (
                    <th className="text-left" key={colIndex} style={col.colStyle}>
                        {col.title}&nbsp;{col.displayInfo && (
                            <OverlayTrigger
                                overlay={(<Tooltip>This field is for...</Tooltip>)}
                                placement={'top'}>
                                <Glyphicon glyph="info-sign"/>
                            </OverlayTrigger>
                        )}
                    </th>
                ))}

                {displayActionsColumn && (
                    <th
                        style={{
                            width: '250px'
                        }}
                    >
                        {displayHeaderActions && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <FormGroup style={{ flex: '0' }}>
                                    <Button onClick={() => fields.push(initialValue as T)}>
                                        <Glyphicon glyph="plus"/> {buttonLabel}
                                    </Button>
                                </FormGroup>

                                {displayHeaderSave && (
                                <FormGroup style={{ flex: '0', marginLeft: '5px', marginRight: '5px' }}>
                                    <HeaderSaveButton formName={'AdminForm'} />
                                </FormGroup>
                                )}
                            </div>
                        )}
                    </th>
                )}
            </tr>
        );
    }

}
