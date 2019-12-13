import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import CancelButton from '../../containers/CancelButton';
import CancelledPopover from '../../components/CancelledPopover';

const CancelColumn = (options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: '',
        colStyle: colStyle,
        FormRenderer: ({ fields, index, model: { id } }) => (
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
                <CancelButton modelId={id} />
        ),
        CanceledRender: ({ model }) => (
            <CancelledPopover model={model} />
        )
    };
};

export default CancelColumn;
