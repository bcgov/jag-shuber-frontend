import * as React from "react"
import {
    Grid,
    Row,
    Col
  } from 'react-bootstrap'
  import OnDutySheriffs from '../modules/sheriffs/containers/OnDutySheriffs';
  import UnassignedTaskList from '../modules/tasks/containers/UnassignedTaskList';
class Home extends React.PureComponent {
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={10}>
                        <OnDutySheriffs />
                    </Col>
                    <Col lg={2}>
                        <UnassignedTaskList />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Home;