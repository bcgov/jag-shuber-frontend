import * as React from 'react'
import * as PropTypes from 'prop-types'
import ItemTypes from '../ItemTypes'
import { DragSource } from 'react-dnd';
import {
    //Label,
    Button,
    ButtonGroup,
    Panel,
    Image,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Grid,
    Row,
    Col
} from 'react-bootstrap'
import { Sheriff, SheriffAbility } from '../../../api/index';


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

class SheriffAbilityPile extends React.PureComponent<{ abilities: SheriffAbility }, any>{
    render() {
        const { abilities } = this.props;
        let icons = [];
        if (abilities && SheriffAbility.CanTransfer) {
            icons.push(<Glyphicon glyph="road" />)
        }
        if (abilities && SheriffAbility.CourtAppearance) {
            icons.push(<Glyphicon glyph="queen" />)
        }
        if (abilities && SheriffAbility.SignDocuments) {
            icons.push(<Glyphicon glyph="pencil" />)
        }
        return (
            <ButtonGroup bsSize="xsmall">
                {icons.map(i=>(<Button disabled>{i}</Button>))}
            </ButtonGroup>
        );
    }
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

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }
    render() {
        const { sheriff, connectDragSource } = this.props;


        return connectDragSource(
            <div>
                <Panel header={<CardHeader sheriff={sheriff} />} height={400}>
                    <ListGroup>
                        <ListGroupItem bsStyle="success">Job 1</ListGroupItem>
                        <ListGroupItem bsStyle="warning">Job 2</ListGroupItem>
                        <ListGroupItem>Job 3</ListGroupItem>
                    </ListGroup>
                </Panel>
            </div>
        )

    }
}

export default DragSource<SheriffCardProps>(ItemTypes.SHERIFF, sheriffSource, collect)(SheriffCard)