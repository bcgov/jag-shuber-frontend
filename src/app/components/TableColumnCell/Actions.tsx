import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

// TODO: Move these into generics!
import CancelledPopover from '../../components/CancelledPopover';
import ApproveButton from '../../containers/ApproveButton';
import CancelButton from '../../containers/CancelButton';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

const ActionsColumn = (): Types.TableColumnCell => {
    return {
        title: '',
        FormRenderer: ({ fields, index, model: { id } }) => (
            !id ?
                (
                    <><ApproveButton modelId={id} />&nbsp;<CancelButton modelId={id} /></>

                )
                :
                (
                    <>
                        <Button bsStyle="primary">
                            <Glyphicon glyph="edit" />
                        </Button>
                        &nbsp;
                        <Button onClick={() => fields.remove(index)}>
                            <Glyphicon glyph="trash" />
                        </Button>
                    </>
                )

        ),
        CanceledRender: ({ model }) => (
            <CancelledPopover model={model} />
        )
    };
};

export default ActionsColumn;
