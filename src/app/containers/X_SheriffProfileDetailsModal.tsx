// import * as React from 'react';
// import { connect } from 'react-redux';
// import { RootState } from '../store';
// import { getSheriff } from '../modules/sheriffs/selectors';
// import {
//     Button,
//     Image
// } from 'react-bootstrap';
// import { 
//     Sheriff, 
//     BLANK_SHERIFF, 
//     IdType 
// } from '../api';
// import SheriffProfileDetails from '../components/SheriffProfileDetails';
// import ModalWrapper from './ModalWrapper/ModalWrapper';

// interface SheriffProfileDetailsModalProps {
//     sheriffId: IdType;
// }

// interface SheriffProfileDetailsModalStateProps {
//     sheriff?: Sheriff;
// }

// class SheriffProfileDetailsModal extends React.Component<SheriffProfileDetailsModalProps & SheriffProfileDetailsModalStateProps>{
//     render() {
//         const { sheriff = BLANK_SHERIFF, sheriff: { firstName, lastName, badgeNo, imageUrl } } = this.props;
//         const title = `${firstName} ${lastName} #${badgeNo}`;
//         return (
//             <ModalWrapper
//                 title={title}
//                 showButton={({ handleShow }) =>
//                     <Button bsStyle="link" bsSize="large" style={{ color: '#494949' }} onClick={() => handleShow()}>
//                         <Image src={imageUrl} circle={true} width="120" height="120" /><br />
//                         {firstName} {lastName} <br /> #{badgeNo}
//                     </Button>}
//                 body={() => <SheriffProfileDetails sheriff={sheriff} />}
//                 styleClassName="modal-wrapper-medium"
//             />
//         );
//     }
// }

// const mapStateToProps = (state: RootState) => {
//     const {sheriffId} = props;
//     return {
//         sheriff: getSheriff(sheriffId)(state)
//     }
// }