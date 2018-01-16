import * as React from "react";
import './Home.css';
import SheriffList from '../../modules/sheriffs/containers/SheriffList';
import UnlinkedAssignmentList from '../../modules/assignments/containers/UnlinkedAssignmentList';
// import CreateAssignmentForm from '../../modules/assignments/containers/CreateAssignmentForm';
import { default as AddAssignmentModal } from '../../modules/assignments/components/AddAssignmentModal';

class Home extends React.PureComponent {
    render() {
        return (
            <div className="Home panel">
                <div className='taskArea'>
                    <UnlinkedAssignmentList />
                </div>
                <div className='createTaskArea'>
                    <AddAssignmentModal />
                </div>
                <div className='sheriffArea'>
                    <SheriffList />
                </div>
            </div>
        );
    }
}

export default Home;