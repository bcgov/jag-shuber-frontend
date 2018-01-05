import * as React from "react"
import {
    Grid,
    Row,
    Col
  } from 'react-bootstrap'
  import OnDutySheriffs from '../modules/sheriffs/containers/OnDutySheriffs';
  import UnlinkedAssignmentList from '../modules/assignments/containers/UnlinkedAssignmentList';
  import CreateAssignmentForm from '../modules/assignments/containers/CreateAssignmentForm';
class Home extends React.PureComponent {
    render() {
        return (
            <Grid>
                <Row>
                    <Col lg={3}>
                        <h1>Outstanding Assignments</h1>
                        <UnlinkedAssignmentList />
                    </Col>
                    <Col lg={7}>
                        <CreateAssignmentForm />
                    </Col>
                </Row>
                <Row>
                    <Col lg={10}>
                        <h1>On Duty Sheriffs</h1>
                        <OnDutySheriffs />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Home;