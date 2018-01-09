import * as React from 'react';
// import * as PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap';
import SheriffCard from './SheriffCard';
import { Sheriff } from '../../../api/index';

export interface SherriffGridProps {
    sheriffs: Sheriff[];
}

class SheriffGrid extends React.PureComponent<SherriffGridProps, any>{
    render() {
        const { sheriffs } = this.props;
        return (
            <div>
                <Grid>
                    <Row>
                        {sheriffs.map(sheriff => (
                            <Col key={sheriff.badgeNumber} sm={6} md={3} lg={2}>
                                <SheriffCard sheriff={sheriff} onClick={() => alert(sheriff.badgeNumber)} />
                            </Col>
                        ))}
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default SheriffGrid;