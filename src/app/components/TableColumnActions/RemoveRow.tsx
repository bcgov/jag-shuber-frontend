import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const RemoveRow = ({ fields, index }: TableColumnActionProps) => {
    return (
        <Button bsStyle="danger" onClick={() => fields.remove(index)}>
            <Glyphicon glyph="ban-circle" />
        </Button>
    );
};

export default RemoveRow;
