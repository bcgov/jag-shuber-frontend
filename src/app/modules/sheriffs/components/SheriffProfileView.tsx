import * as React from 'react';
import { Sheriff } from '../../../api/index';
import {
    Table
} from 'react-bootstrap';
import OvertimeDetails from '../../overtime/components/OvertimeDetails';
import UpcomingScheduleView from '../../schedule/components/UpcomingScheduleView';

export interface SheriffProfileProps {
    sheriff: Sheriff;
}

export default class SheriffProfile extends React.Component<SheriffProfileProps, any>{
    render() {
        const { sheriff: { currentWorksite, currentLocation, permanentWorksite, permanentLocation, training } } = this.props;
        return (
            <div>
                <h3>Worksite Details</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th>Worksite</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Permanent</strong></td>
                            <td>{permanentWorksite}</td>
                            <td>{permanentLocation}</td>
                        </tr>
                        <tr>
                            <td><strong>Current</strong></td>
                            <td>{currentWorksite}</td>
                            <td>{currentLocation}</td>
                        </tr>
                    </tbody>
                </Table>
                <br />

                <h3>Training</h3>
                {training.map(function (training, index) {
                    return (
                        <p key={index}>
                            <strong>Type:</strong>{training.trainingType}<br />
                            <strong>Certification:</strong>{training.certificationDate.toString().substring(0, 15)}<br />
                            <strong>Expiry:</strong>{training.expiryDate.toString().substring(0, 15)}<br />
                        </p>
                    );
                })}

                <br />
                <UpcomingScheduleView />

                <br />
                <OvertimeDetails />

            </div>
        );
    }
}