import { Button, Glyphicon } from 'react-bootstrap';
import * as React from 'react';

export default () => {
    return (
        <Button bsStyle={'default'} onClick={() => {}}>
            <Glyphicon glyph="ban-circle" />
        </Button>
    );
};
