import * as React from 'react';
import { 
    Table,
    Glyphicon,
    Badge
} from 'react-bootstrap';


export default class SheriffOvertimeStatus extends React.PureComponent{
    render() {
        
        return (
            <div>
                <h3>Overtime</h3>
                <strong>Rank for next avaiable shift:</strong> <Badge>3</Badge>
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-left">Date</th>
                            <th className="text-left">Hours</th>
                            <th className="text-left"> Status</th>
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