import * as React from 'react';
import { ColumnRenderer } from '../../../containers/SheriffProfilePluginRoles/RolesFieldTable';

export default interface TableColumnCell {
    title: React.ReactNode;
    FormRenderer: ColumnRenderer;
    CanceledRender: ColumnRenderer;
}
