import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const DeleteRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <Button bsStyle="danger" onClick={() => fields.remove(index)}>
            <Glyphicon glyph="trash" />
        </Button>
    );
};

export default DeleteRow;
