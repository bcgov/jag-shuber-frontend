import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

import LeaveCancelledPopover from '../../components/LeaveCancelledPopover';
import CancelLeaveButton from '../../containers/CancelLeaveButton';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    leave: Partial<Leave>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

const ActionsColumn = (): Types.TableColumnCell => {
    return {
        title: '',
        FormRenderer: ({ fields, index, leave: { id } }) => (
            !id ?
                (
                    <>
                        <>
                            <Button
                                bsStyle="link"
                                // onClick={() => fields.remove(index)}
                                style={{ color: '#003366' }}
                            >
                                <Glyphicon glyph="edit" />
                            </Button>
                            <Button
                                bsStyle="link"
                                // onClick={() => fields.remove(index)}
                                style={{ color: '#003366' }}
                            >
                                <Glyphicon glyph="trash" />
                            </Button>
                        </>
                        <>
                            <Button
                                bsStyle="link"
                                // onClick={() => fields.remove(index)}
                                style={{ color: 'limegreen' }}
                            >
                                <Glyphicon glyph="ok" />
                            </Button>
                            <Button
                                bsStyle="link"
                                onClick={() => fields.remove(index)}
                                style={{ color: 'darkred' }}
                            >
                                <Glyphicon glyph="remove" />
                            </Button>
                        </>
                    </>
                )
                :
                <CancelLeaveButton leaveId={id} />
        ),
        CanceledRender: ({ leave }) => (
            <LeaveCancelledPopover leave={leave} />
        )
    };
};

export default ActionsColumn;
