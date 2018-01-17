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
import { default as ViewSheriffProfileModal } from './ViewSheriffProfileModal';
import { default as LimitedSheriffProfileView } from './LimitedSheriffProfileView';

export interface SheriffCardProps {
    onClick: () => void;
    sheriff: Sheriff;
}

export default class SheriffCard extends React.PureComponent<SheriffCardProps, any>{

    render() {
        const { sheriff, sheriff: { badgeNumber, imageUrl } } = this.props;
        const showProfileDetails = (
            <Popover id="popover-trigger-focus">
               <LimitedSheriffProfileView sheriff={sheriff} />
            </Popover>
        );
        return (

            <Grid fluid>
                <Row>
                    <Col>
                        <Image responsive src={imageUrl} circle width="120" height="120" />
                    
                        <ViewSheriffProfileModal sheriff={sheriff}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Badge Number:</b> #{badgeNumber}
                    </Col>
                </Row>
                <Row>
                
                <OverlayTrigger trigger="focus" placement="right" overlay={showProfileDetails}>
                    <Button><Glyphicon glyph="menu-right" /></Button>
                </OverlayTrigger>
                </Row>
            </Grid>

        );
    }
}
