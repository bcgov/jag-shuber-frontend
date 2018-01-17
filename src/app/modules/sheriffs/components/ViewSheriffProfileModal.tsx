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
        const {sheriff, sheriff:{firstName, lastName, badgeNumber}} = this.props;
        return (
			<div>			
				<Button bsStyle="link" bsSize="large" style={{color: "#494949"}} onClick={() => this.handleShow()}>
                    {/* <Glyphicon glyph="info-sign" /> */}
                    {firstName} {lastName}
				</Button>

				<Modal show={this.state.showModal} onHide={() => this.handleClose()}>
					<Modal.Header closeButton>
						<Modal.Title>{firstName} {lastName} #{badgeNumber}</Modal.Title>
                        
					</Modal.Header>
					<Modal.Body>
                    <Button className="pull-right"><Glyphicon glyph="pencil" /></Button>
                    <br/>
                    <br/>
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