import * as React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

import CancelLeaveButton from '../../containers/CancelLeaveButton';
import LeaveCancelledPopover from '../../components/LeaveCancelledPopover';

const CancelColumn = (): Types.TableColumnCell => {
    return {
        title: '',
        FormRenderer: ({ fields, index, leave: { id } }) => (
            !id ?
                (
                    <Button
                        bsStyle="link"
                        onClick={() => fields.remove(index)}
                        style={{ color: '#666666' }}
                    >
                        <Glyphicon glyph="remove" />
                    </Button>
                )
                :
                <CancelLeaveButton leaveId={id} />
        ),
        CanceledRender: ({ leave }) => (
            <LeaveCancelledPopover leave={leave} />
        )
    };
};

export default CancelColumn;
