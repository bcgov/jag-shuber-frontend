import * as React from 'react';
import { 
    Well,
    Table 
} from 'react-bootstrap';
import AddAssignmentModal from '../containers/AddAssignmentModal';

export interface AssignmentDefaultListProps {
   
}

export default class AssignmentDefaultList extends React.PureComponent<AssignmentDefaultListProps, any> {
    render() {
        return (
            <div style={{display: "flex", justifyContent:"center"}}>
                <Well style={{display:"flex", backgroundColor:'white', flexDirection: "column", flex: "1 1", maxWidth:"80%", minWidth:800}}>
                <div style={{flex: "1", alignSelf:"center", paddingBottom:15}}>
                    <h1>Manage Default Assignments</h1>
                </div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-left">Assignment</th>
                            <th className="text-left">Work Section</th>
                            <th className="text-left">Default Days &amp; Times</th>                            
                            <th className="text-left"># of Sheriffs</th>
                        </tr>
                    </thead> 
                    <tbody>
                        <tr>
                            <td>Courtroom 101</td>
                            <td>Courts</td>
                            <td>
                                Weekdays - 09:00-17:00
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Courtroom 102</td>
                            <td>Courts</td>
                            <td>
                                Weekdays - 09:00-17:00
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Courtroom 103</td>
                            <td>Courts</td>
                            <td>
                                Mon, Tues, Wed - 09:00-17:00 <br/>
                                Thurs, Fri - 10:00-17:00 <br/>
                            </td>
                            <td>2</td>
                        </tr>
                    </tbody>
                </Table>
                <div style={{textAlign:"right"}}>
                <AddAssignmentModal />
                </div>
                </Well>
            </div>
        );
    }
}
