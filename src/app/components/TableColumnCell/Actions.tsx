import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

// TODO: Move these into generics!
import CancelledPopover from '../../components/CancelledPopover';
import ApproveButton from '../../containers/ApproveButton';
import SaveButton from '../../containers/SaveButton';
import CancelButton from '../../containers/CancelButton';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export type ColumnRenderer = React.ComponentType<ColumnRendererProps>;

const ActionsColumn = (options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: '',
        colStyle: colStyle,
        // TODO: Don't hardcode in the formName! This is just in here while I work on some save related stuff...
        FormRenderer: ({ fields, index, model }) => (
            !model.id ?
                (
                    <>
                        {/*
                        <SaveButton formName={'AdminForm'} modelId={model.id} model={model} />
                        &nbsp;
                        <CancelButton modelId={model.id} />
                        */}
                        <Button bsStyle={'default'} onClick={() => {}}>
                            <Glyphicon glyph="ban-circle" />
                        </Button>
                        &nbsp;
                        <Button bsStyle={'danger'} onClick={() => fields.remove(index)}>
                            <Glyphicon glyph="trash" />
                        </Button>
                    </>

                )
                :
                (
                    <>
                        <Button bsStyle="warning">
                            <Glyphicon glyph="time" />
                        </Button>
                        &nbsp;
                        {/* TODO:
                        1 - compose buttons instead of having them all in here...
                        2 - we don't need an edit button in most cases, functionality not implemented yet
                        */}
                        {/*<Button bsStyle="primary">
                            <Glyphicon glyph="edit" />
                        </Button>
                        &nbsp;*/}
                        <Button bsStyle={'danger'} onClick={() => fields.remove(index)}>
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
