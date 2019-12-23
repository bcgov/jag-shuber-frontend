import * as React from 'react';

import * as Types from './types';
import { FieldsProps } from 'redux-form';
import { Leave } from '../../api';

// TODO: Move these into generics!
// TODO: Move CancelledPopover out of here!
import CancelledPopover from '../../components/CancelledPopover';

export interface ColumnRendererProps {
    index: number;
    fields: FieldsProps<Partial<Leave>>;
    model: Partial<any>;
    fieldInstanceName: string;
}

export interface ActionProps extends ColumnRendererProps {

}

export interface ActionColumnOptions extends Types.FieldColumnOptions {
    actions: React.ReactType<ActionProps>[];
}

const ActionsColumn = (options?: ActionColumnOptions): Types.TableColumnCell => {
    const colStyle = (options && options.colStyle) ? options.colStyle : {};
    const actions = (options && options.actions) ? options.actions : [];

    return {
        title: '',
        colStyle: colStyle,
        // TODO: Don't hardcode in the formName! This is just in here while I work on some save related stuff...
        FormRenderer: ({ fields, index, model }) => (
            <>
                {actions.map(action => {
                    const Action = action;
                    return <><Action fields={fields} index={index} model={model} />&nbsp;</>;
                })}
            </>

        ),
        CanceledRender: ({ model }) => (
            <CancelledPopover model={model} />
        )
    };
};

export default ActionsColumn;
