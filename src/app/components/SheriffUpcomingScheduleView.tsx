import * as React from 'react';
import { 
    Table
} from 'react-bootstrap';
import SheriffScheduleStatus from './SheriffScheduleStatus';
import { Sheriff } from '../api/index';

export interface SheriffUpcomingScheduleViewProps {
    sheriff: Sheriff;
}

export default class SheriffUpcomingScheduleView extends React.Component<SheriffUpcomingScheduleViewProps, any>{
    render() {
        const { sheriff } = this.props;
        return (
            <div>
                <SheriffScheduleStatus sheriff ={ sheriff } />
                
                <Table responsive>
                    <thead>
                        <tr>
                            <th className="text-left">Day</th>
                            <th className="text-left">Shift</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sun Jan 28 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Mon Jan 29 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Tues Jan 30 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Wed Jan 31 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Thur Feb 01 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Fri Feb 02 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                        <tr>
                            <td>Sat Feb 03 2018</td>
                            <td>7AM to 7PM </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}