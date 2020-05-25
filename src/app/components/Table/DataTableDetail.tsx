import React from 'react';

export interface DataTableDetailComponentProps {
    parentModel?: any;
    parentModelId?: any;
    getPluginPermissions?: Function;
}

export interface DataTableDetailProps {
    fieldModel: any;
    index: number;
    columns: any[];
    expandable: boolean;
    rowComponent: any;
}

class DataTableDetail extends React.Component<DataTableDetailProps> {
    render() {
        const {
            fieldModel,
            index,
            columns = [],
            expandable = false,
            rowComponent,
        } = this.props;

        // TODO: Rename as detail component, cause that's what this really is...
        const RowComponent = rowComponent;

        return (
            <tr key={index * 2}>
                <td>{/* Nest the Table for sub-rows */}</td>
                {/* tslint:disable-next-line:max-line-length */}
                <td
                    style={{margin: '0', padding: '0'}}
                    colSpan={expandable ? columns.length + 1 : columns.length}>
                    <RowComponent
                        parentModel={fieldModel}
                        parentModelId={fieldModel.id}
                    />
                </td>
            </tr>
        );
    }
}

export default DataTableDetail;
