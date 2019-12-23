import { Button, Glyphicon } from 'react-bootstrap';
import * as React from 'react';
import { TableColumnActionProps } from './index';

export default ({}: TableColumnActionProps) => {
    return (
        <Button bsStyle={'default'} onClick={() => {}}>
            <Glyphicon glyph="ban-circle" />
        </Button>
    );
};
