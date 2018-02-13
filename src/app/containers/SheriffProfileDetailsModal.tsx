import * as React from 'react';
import {
    Button,
    Image
} from 'react-bootstrap';
import { Sheriff, BLANK_SHERIFF } from '../api';
import SheriffProfileDetails from '../components/SheriffProfileDetails';
import ModalWrapper from './ModalWrapper';

export interface SheriffProfileDetailsModalProps {
    sheriff: Sheriff;
}

export default class SheriffProfileDetailsModal extends React.Component<SheriffProfileDetailsModalProps>{
    render() {
        const { sheriff = BLANK_SHERIFF, sheriff: { firstName, lastName, badgeNumber, imageUrl } } = this.props;
        const title = `${firstName} ${lastName} #${badgeNumber}`;
        return (
            <ModalWrapper
                title={title}
                showButton={({ handleShow }) =>
                    <Button bsStyle="link" bsSize="large" style={{ color: "#494949" }} onClick={() => handleShow()}>
                        <Image src={imageUrl} circle width="120" height="120" /><br />
                        {firstName} {lastName} <br /> #{badgeNumber}
                    </Button>
                }
                body={() => <SheriffProfileDetails sheriff={sheriff} />}
            />
        );
    }
}