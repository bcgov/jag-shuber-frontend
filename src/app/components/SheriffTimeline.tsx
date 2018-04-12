
import * as React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import SheriffCard from './SheriffCard'
import { Sheriff } from '../api/index';

export interface SheriffTimelineProps {
    sheriffs: Sheriff[]
}

class SheriffTimeline extends React.PureComponent<SheriffTimelineProps, any>{
    render() {
        const { sheriffs } = this.props;

        return (
            <div>
                <Grid>
                    {sheriffs.map(sheriff => (
                        <Row key={sheriff.badgeNo} >
                            <Col sm={12} md={12} lg={12}>
                                <SheriffCard sheriff={sheriff} onClick={() => alert(sheriff.badgeNo)} />
                            </Col>
                        </Row>
                    ))}
                </Grid>
            </div>
        )
    }
}

export default SheriffTimeline