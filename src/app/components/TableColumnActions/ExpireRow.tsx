import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const ExpireRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <Button bsStyle="warning">
            <Glyphicon glyph="time" onClick={() => fields.remove(index)} />
        </Button>
    );
};

export default ExpireRow;
