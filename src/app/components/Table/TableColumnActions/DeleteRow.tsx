import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const DeleteRow = ({ fields, index , showComponent = false }: TableColumnActionProps) => {
    if (!showComponent) return null;
    return (
        <Button bsStyle="danger" onClick={() => fields.remove(index)}>
            <Glyphicon glyph="trash" />
        </Button>
    );
};

export default DeleteRow;
