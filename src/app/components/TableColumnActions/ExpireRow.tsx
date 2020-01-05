import * as React from 'react';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const ExpireRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <OverlayTrigger overlay={(<Tooltip>Expire</Tooltip>)} placement={'left'}>
            <Button bsStyle="warning">
                <Glyphicon glyph="time" onClick={() => fields.remove(index)} />
            </Button>
        </OverlayTrigger>
    );
};

export default ExpireRow;
