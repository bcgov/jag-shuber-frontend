import * as React from "react"
import './Home.css'
// import {
//     Panel
// } from 'react-bootstrap'
import OnDutySheriffs from '../../modules/sheriffs/containers/OnDutySheriffs';
import UnlinkedAssignmentList from '../../modules/assignments/containers/UnlinkedAssignmentList';
import CreateAssignmentForm from '../../modules/assignments/containers/CreateAssignmentForm';
class Home extends React.PureComponent {
    render() {
        return (
            <div className="Home panel">
                <div className='taskArea'>
                    <UnlinkedAssignmentList />
                </div>
                <div className='createTaskArea'>
                    <CreateAssignmentForm />
                </div>
                <div className='sheriffArea'>
                    <OnDutySheriffs />
                </div>
            </div>
        );
    }
}

export default Home;