import * as React from 'react';
import { 
    Table,
    Glyphicon,
    Badge
} from 'react-bootstrap';

export interface OvertimeDetailsProps {
    
}

export default class SheriffProfile extends React.Component<OvertimeDetailsProps, any>{
    render() {
        
        return (
            <div>
                <h3>Overtime</h3>
                <strong>Rank for next avaiable shift:</strong> <Badge>3</Badge>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Hours</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Dec 05 2017</td>
                            <td>8</td>
                            <td><Glyphicon glyph="ok" className="text-success" /></td>
                        </tr>
                        <tr>
                            <td>Jan 01 2018</td>
                            <td>8</td>
                            <td><Glyphicon glyph="remove" className="text-danger"/></td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}