import * as React from 'react';

import { Button, Glyphicon } from 'react-bootstrap';

import * as Types from './types';

const ButtonColumn = (label?: string, icon?: string, options?: Types.FieldColumnOptions, onButtonClicked?: any): Types.TableColumnCell => {
    label = label || 'Button';

    // @ts-ignore


    return {
        title: '',
        FormRenderer: ({ fieldInstanceName, callbackContext }) => {
            const handleClick = (onButtonClicked)
                ? (ev: React.SyntheticEvent<any>) => {
                    onButtonClicked(ev, callbackContext);
                }
                : () => {};

            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button onClick={handleClick}>
                        {icon && (
                            <><Glyphicon glyph={icon} /> {label}</>
                        )}

                        {!icon && (
                            <>{label}</>
                        )}
                    </Button>
                </div>
            );
        },
        CanceledRender: ({ leave }) => (
            <div />
        )
    };
};

export default ButtonColumn;
