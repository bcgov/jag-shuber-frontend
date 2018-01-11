import * as React from 'react';
import {
    Panel,
    Image,
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import SheriffAbilityPile from '../../../components/SheriffAbilityPile';
import LinkedAssignmentList from '../../assignments/containers/LinkedAssignmentList';
import { Sheriff } from '../../../api/index';

export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
    connectDragSource?: any;
    isDragging?: boolean;
}

class CardHeader extends React.PureComponent<{ sheriff: Sheriff }, any>{
    render() {
        const { sheriff: { firstName, lastName, badgeNumber, imageUrl, abilities, permanentLocation, permanentWorksite, currentWorksite, currentLocation, training } } = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <Image responsive src={imageUrl} circle onClick={()=>alert("hello")}/>
                    </Col>
                    <Col>
                        <h4>{firstName} {lastName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Badge:</b> #{badgeNumber}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Perm Loc:</b> {permanentLocation}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Perm Worksite:</b> {permanentWorksite}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Curr Loc:</b> {currentLocation}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Curr Worksite:</b> {currentWorksite}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <b>Training:</b> 
                        {training.map(function(training, index){
                            return(
                            <p key={ index }>{training.trainingType} {training.certificationDate} {training.expiryDate}</p>
                        );
                        })}
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <SheriffAbilityPile abilities={abilities} />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff} = this.props;


        return (
            <div>
                {/* () => <CardHeader sheriff={sheriff} /> */}
                <Panel header="text" height={400}>
                    
                        <CardHeader sheriff={sheriff}/>
                        <LinkedAssignmentList sheriffId={sheriff.badgeNumber} />
                   
                </Panel>
            </div>
        )

    }
}