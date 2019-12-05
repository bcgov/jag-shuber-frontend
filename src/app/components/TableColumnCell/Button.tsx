import * as React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

const ButtonColumn = (label?: string, icon?: string, options?: Types.FieldColumnOptions): Types.TableColumnCell => {
    label = label || 'Button';

    return {
        title: '',
        FormRenderer: ({ fieldInstanceName }) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button>
                    {icon && (
                        <><Glyphicon glyph={icon} /> {label}</>
                    )}

                    {!icon && (
                        <>{label}</>
                    )}
                </Button>
            </div>
        ),
        CanceledRender: ({ leave }) => (
            <div />
        )
    };
};

export default ButtonColumn;
