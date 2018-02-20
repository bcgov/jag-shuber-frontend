import * as React from 'react';
import {
    Button,
    Glyphicon
} from 'react-bootstrap';
import ModalWrapper from './ModalWrapper';
import { connect } from 'react-redux';
import { deleteAssignment } from '../modules/assignments/actions';
import { IdType } from '../api';

export interface AssignmentDeleteModalProps {
    assignmentId: IdType;
    deleteAssignment?: (id: IdType) => void;
}

class AssignmentDeleteModal extends React.Component<AssignmentDeleteModalProps>{
    render() {
        const { deleteAssignment, assignmentId } = this.props;
        return (
            <div>
                <ModalWrapper
                    title="Delete Assignment"
                    showButton={({ handleShow }) => <Button bsStyle="danger" bsSize="xsmall" onClick={() => handleShow()}><Glyphicon glyph="trash" /></Button>}
                    body={() => "Are you sure you want to delete this assignment?"}
                    footerComponent={({ handleClose }) => <Button bsStyle="danger" onClick={() => {
                        deleteAssignment && deleteAssignment(assignmentId);
                        handleClose();
                    }}>Delete</Button>}
                />
            </div>
        );
    }
}

export default connect<{}, any, AssignmentDeleteModalProps>(null, { deleteAssignment: deleteAssignment })(AssignmentDeleteModal)