import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import CancelButton from '../../containers/CancelButton';
import CancelledPopover from '../../components/CancelledPopover';

const CancelColumn = (): Types.TableColumnCell => {
    return {
        title: '',
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
