import * as React from 'react';
import {
    Button,
    Glyphicon, 
    Modal
} from 'react-bootstrap';
import { Sheriff, BLANK_SHERIFF } from '../../../api/index';
import { default as SheriffProfileView } from './SheriffProfileView';

export interface ViewSheriffProfileModalProps{
    open?: boolean;
    sheriff: Sheriff;
}

export interface ViewSheriffProfileModalState{
    showModal?: boolean;

}

export default class ViewSheriffProfileModal extends React.Component<ViewSheriffProfileModalProps, ViewSheriffProfileModalState>{
    static defaultProps:ViewSheriffProfileModalProps = {
        open: false, 
        sheriff: BLANK_SHERIFF
    }

    constructor(props: ViewSheriffProfileModalProps){
        super(props);
        this.state = { showModal: props.open };
    }

    handleShow(){
        this.setState({ showModal: true })
    }

    handleClose(){
        this.setState({ showModal: false })
    }
    render(){
        const {sheriff, sheriff:{firstName, lastName}} = this.props;
        return (
			<div>			
				<Button onClick={() => this.handleShow()}>
                    <Glyphicon glyph="info-sign" />
				</Button>

				<Modal show={this.state.showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>{firstName} {lastName}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
                        <SheriffProfileView sheriff={sheriff}/>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.handleClose()}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
        );
    }
}