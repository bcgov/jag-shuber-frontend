import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const RemoveRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <Button bsStyle="danger">
            <Glyphicon glyph="trash" onClick={() => fields.remove(index)} />
        </Button>
    );
};

export default RemoveRow;
