import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import { TableColumnActionProps } from './index';

const UnexpireRow = ({ fields, index , showComponent = false }: TableColumnActionProps) => {
    if (!showComponent) return null;
    return (
        <Button bsStyle="info" onClick={() => null}>
            <Glyphicon glyph="repeat" />
        </Button>
    );
};

export default UnexpireRow;
