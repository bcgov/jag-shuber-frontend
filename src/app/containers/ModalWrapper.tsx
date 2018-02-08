import * as React from 'react';
import {
    Modal,
    Button
} from 'react-bootstrap';

export interface ShowButtonProps {
    handleClose: ()=>void;
    handleShow: ()=>void;
}

export interface ModalWrapperProps {
    isOpen?: boolean;
    showButton?: (handleShow:()=>void)=>React.ReactNode;
    title: string;
    body: (props:{handleShow:()=>void, handleClose:()=>void})=>React.ReactNode;
    footerComponent?: React.ReactNode;

}

export interface ModalWrapperState {
    showModal?: boolean;
}

export default class ModalWrapper extends React.Component<ModalWrapperProps, ModalWrapperState>{
    static defaultProps = {
        isOpen: false,
        showButton:(h:any)=><Button onClick={h}>Show</Button>
    }

    constructor(props: ModalWrapperProps) {
        super(props);
        this.state = { showModal: props.isOpen };
    }

    handleShow() {
        this.setState({
            showModal: true
        })
    }

    handleClose() {
        this.setState({ showModal: false })
    }

    render() {
        const { showModal } = this.state;
        const { title, showButton=ModalWrapper.defaultProps.showButton, body, footerComponent } = this.props;
        const handlers = {handleClose:()=>this.handleClose(), handleShow:()=>this.handleShow()}
        return (
            <div>
                {showButton(handlers.handleShow)}
                <Modal show={showModal} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {body(handlers)}
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