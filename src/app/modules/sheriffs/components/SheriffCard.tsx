import * as React from 'react';
import {
    Image,
    Grid,
    Row,
    Col,
    Popover,
    OverlayTrigger,
    Button,
    Glyphicon
} from 'react-bootstrap';
import { Sheriff } from '../../../api/index';
import { default as SheriffProfileView } from './SheriffProfileView';


export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
    connectDragSource?: any;
    isDragging?: boolean;
}

class CardHeader extends React.PureComponent<{ sheriff: Sheriff }, any>{

    render() {
        const { sheriff, sheriff: { firstName, lastName, badgeNumber, imageUrl } } = this.props;
        const showProfileDetails = (
            <Popover id="popover-trigger-focus">
               <SheriffProfileView sheriff={sheriff} />
            </Popover>
        );
        return (

            <Grid fluid>
                <Row className="show-grid">
                    <Col>
                        <Image responsive src={imageUrl} circle />
                    </Col>
                    <Col>
                        <h2>{firstName} {lastName}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Badge Number:</b> #{badgeNumber}
                    </Col>
                </Row>
                <Button><Glyphicon glyph="pencil" /></Button>
                <OverlayTrigger trigger="focus" placement="right" overlay={showProfileDetails}>
                    <Button><Glyphicon glyph="info-sign" /></Button>
                </OverlayTrigger>
            </Grid>

        );
    }
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff } = this.props;
        
        return (
            <div>

                {/* <Panel header="text" height={400}> */}

                <CardHeader sheriff={sheriff} />



                {/* </Panel> */}



            </div>
        )

    }
}