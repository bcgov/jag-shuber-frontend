import * as React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const ExpireRow = ({ fields, index , showComponent = false }: TableColumnActionProps) => {
    if (!showComponent) return null;
    return (
        <OverlayTrigger overlay={(<Tooltip>Expire</Tooltip>)} placement={'left'}>
            <Button bsStyle="warning">
                <Glyphicon glyph="time" onClick={() => fields.remove(index)} />
            </Button>
        </OverlayTrigger>
    );
};

export default ExpireRow;
