import * as React from 'react';

import * as Types from './types';
import { FieldColumnOptions } from './types';
import avatarImg from '../../assets/images/avatar.png';

const HtmlColumn = (label?: string, options?: FieldColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};

    // @ts-ignore
    let imageSrc = avatarImg;

    return {
        title: '',
        colStyle: colStyle,
        FormRenderer: () => {
            return (
                <div>
                    {options && options.component}
                </div>
            );
        },
        CanceledRender: ({ model }) => (
            <div />
        )
    };
};

export default HtmlColumn;
