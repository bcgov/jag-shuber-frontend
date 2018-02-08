import * as React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

export interface ModalWrapperContext {
    handleClose: ()=>void;
    handleShow: (context?:any)=>void;
}

export interface ModalWrapperProps {
    isOpen?: boolean;
    showButton?: (context:ModalWrapperContext)=>React.ReactNode;
    title: string;
    body: (context:ModalWrapperContext)=>React.ReactNode;
    footerComponent?: React.ReactNode;

}

export interface ModalWrapperState {
    showModal?: boolean;
}

export default class ModalWrapper extends React.Component<ModalWrapperProps, ModalWrapperState>{
    static defaultProps = {
        isOpen: false,
        showButton:({handleShow}:ModalWrapperContext)=><Button onClick={handleShow}>Show</Button>
    }

    constructor(props: ModalWrapperProps) {
        super(props);
        this.state = { showModal: props.isOpen };
    }

    handleShow(extraState?:any) {
        this.setState({
            showModal: true,
            ...extraState
            
        })
    }

    handleClose() {
        this.setState({ showModal: false })
    }

    render() {
        const { showModal, ...restState } = this.state;
        const { title, showButton=ModalWrapper.defaultProps.showButton, body, footerComponent } = this.props;
        const context = {handleClose:()=>this.handleClose(), handleShow:(extraState?:any)=>this.handleShow(extraState), ...restState}
        return (
            <div>
                {showButton(context)}
                <Modal show={showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body(context)}
                    </Modal.Body>
                    <Modal.Footer>
                        {footerComponent}
                        <Button onClick={() => this.handleClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}