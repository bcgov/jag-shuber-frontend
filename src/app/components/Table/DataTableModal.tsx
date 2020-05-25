import React from 'react';

export interface DataTableModalComponentProps {}

export interface DataTableModalProps {
    fieldModel: any;
    index: any;
    modalProps: any;
    modalComponent: any;
}

class DataTableModal extends React.Component<DataTableModalProps> {
    render() {
        const {
            fieldModel,
            modalProps = {
                isOpen: false,
                onClose: () => {}
            },
            modalComponent
        } = this.props;

        // TODO: Rename as detail component, cause that's what this really is...
        const ModalComponent = modalComponent;

        const modalIsOpen = (modalProps && typeof modalProps.isOpen === 'function')
            ? modalProps.isOpen(fieldModel) : modalProps.fieldModel;

        const onClose = (modalProps && typeof modalProps.onClose === 'function')
            ? () => modalProps.onClose(fieldModel) : () => {};

        return (
            <ModalComponent
                {...modalProps}
                isOpen={modalIsOpen}
                onClose={onClose}
                parentModel={fieldModel}
                parentModelId={fieldModel.id}
            />
        );
    }
}

export default DataTableModal;
