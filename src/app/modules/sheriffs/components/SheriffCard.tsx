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
        const { sheriff: { firstName, lastName, badgeNumber, imageUrl, abilities } } = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <Image responsive src={imageUrl} circle />
                    </Col>
                    <Col>
                        <h4>{firstName} {lastName}</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        Badge: #{badgeNumber}
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
                <Panel header={<CardHeader sheriff={sheriff} />} height={400}>
                    <LinkedAssignmentList sheriffId={sheriff.badgeNumber} />
                </Panel>
            </div>
        )

    }
}