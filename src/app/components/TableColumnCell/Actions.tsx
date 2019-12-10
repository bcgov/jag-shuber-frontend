import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

// TODO: Move these into generics!
import CancelledPopover from '../../components/CancelledPopover';
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
                <CancelButton modelId={id} />
        ),
        CanceledRender: ({ model }) => (
            <CancelledPopover model={model} />
        )
    };
};

export default ActionsColumn;
