import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import CancelButton from '../../../containers/CancelButton';
import CancelledPopover from '../../CancelledPopover';

const CancelColumn = (options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    return {
        title: '',
        colStyle: colStyle,
        FormRenderer: ({ fields, index, model, disabled }) => {
            return !model || !model.id ?
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
                (<CancelButton modelId={model.id} />);
        },
        CanceledRender: ({ model }) => {
            if (!model) return null;
            return (
                <CancelledPopover model={model} />
            );
        }
    };
};

export default CancelColumn;
