import * as React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';
import './ModalWrapper.css';

export interface ModalWrapperContext {
    handleClose: () => void;
    handleShow: (context?: {}) => void;
}

export interface ModalWrapperProps {
    isOpen?: boolean;
    showButton?: (context: ModalWrapperContext) => React.ReactNode;
    title: string;
    body: (context: ModalWrapperContext) => React.ReactNode;
    footerComponent?: 
        React.ReactNode |
        ((context: ModalWrapperContext) => React.ReactNode) |
        React.ReactNode[] |
        ((context: ModalWrapperContext) => React.ReactNode[]);
    styleClassName?: string;
}

export interface ModalWrapperState {
    showModal?: boolean;
}

export default class ModalWrapper extends React.Component<ModalWrapperProps, ModalWrapperState> {
    static defaultProps = {
        isOpen: false,
        showButton: ({ handleShow }: ModalWrapperContext) => <Button onClick={handleShow}>Show</Button>
    };

    constructor(props: ModalWrapperProps) {
        super(props);
        this.state = { showModal: props.isOpen };
    }

    handleShow(extraState?: {}) {
        this.setState({
            showModal: true,
            ...extraState

        });
    }

    handleClose() {
        this.setState({ showModal: false });
    }

    render() {
        const { showModal, ...restState } = this.state;
        const { 
            title, 
            showButton = ModalWrapper.defaultProps.showButton, 
            body, 
            footerComponent, 
            styleClassName = 'modal-wrapper-large' 
        } = this.props;
        const context = {
            handleClose: () =>
                this.handleClose(), handleShow: (extraState?: {}) => this.handleShow(extraState), ...restState
        };
        return (
            <div>
                {showButton(context)}
                <Modal show={showModal} onHide={() => this.handleClose()} dialogClassName={styleClassName}>
                    <Modal.Header closeButton={true}>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body(context)}
                    </Modal.Body>
                    <Modal.Footer>
                        {typeof footerComponent === 'function' ? footerComponent(context) : footerComponent}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}