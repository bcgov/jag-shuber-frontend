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
import { default as ViewSheriffProfileModal } from './ViewSheriffProfileModal';

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
                <Row>
                    <Col>
                        <Image responsive src={imageUrl} circle width="120" height="120" />
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
                
                <ViewSheriffProfileModal sheriff={sheriff}/>
                <Button><Glyphicon glyph="pencil" /></Button>
                <OverlayTrigger trigger="focus" placement="right" overlay={showProfileDetails}>
                    <Button><Glyphicon glyph="menu-right" /></Button>
                </OverlayTrigger>
            </Grid>
            // <Table>
            //     <tbody>
            //         <tr>
            //             <td>
            //                 row 1 col 1
            //             </td>
            //             <td>
            //                 row 1 col 2
            //             </td>
            //         </tr>
            //         <tr>
            //             <td>
            //                 row 2 col 1
            //             </td>
            //             <td>
            //                 row 2 col 2
            //             </td>
            //         </tr>
            //     </tbody>
            // </Table>


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
