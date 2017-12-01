import * as React from 'react'
// import * as PropTypes from 'prop-types'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd';
import {
    //Label,
    Panel,
    Image,
    // ListGroup,
    // ListGroupItem,
    Grid,
    Row,
    Col
} from 'react-bootstrap'
import SheriffAbilityPile from '../../../components/SheriffAbilityPile'
import AssignedTaskList from '../../tasks/containers/AssignedTaskList'
import { Sheriff } from '../../../api/index';


const sheriffSource: any = {
    beginDrag(props: any) {
        return props;
    }
}

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
    connectDragSource?: any;
    isDragging?: boolean;
}



class CardHeader extends React.PureComponent<{ sheriff: Sheriff }, any>{
    render() {
        const { sheriff: { name, badgeNumber, imageUrl, abilities } } = this.props;
        return (
            <Grid fluid>
                <Row>
                    <Col xs={12}>
                        <Image responsive src={imageUrl} circle />
                    </Col>
                    <Col>
                        <h4>{name}</h4>
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

class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    // static propTypes = {
    //     onClick: PropTypes.func.isRequired,
    //     completed: PropTypes.bool.isRequired,
    //     text: PropTypes.string.isRequired
    // }

    render() {
        const { sheriff} = this.props;


        return (
            <div>
                <Panel header={<CardHeader sheriff={sheriff} />} height={400}>
                    <AssignedTaskList sheriffId={sheriff.badgeNumber} />
                    {/* <ListGroup>
                        <ListGroupItem bsStyle="success">Job 1</ListGroupItem>
                        <ListGroupItem bsStyle="warning">Job 2</ListGroupItem>
                        <ListGroupItem>Job 3</ListGroupItem>
                    </ListGroup> */}
                </Panel>
            </div>
        )

    }
}

export default DragSource<SheriffCardProps>(ItemTypes.SHERIFF, sheriffSource, collect)(SheriffCard)