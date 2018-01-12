import * as React from 'react';
import { Sheriff } from '../../../api/index';
import {
    Table
} from 'react-bootstrap';

export interface TrainingDetailsViewProps {
    sheriff: Sheriff;
}

export default class WorksiteDetailsView extends React.Component<TrainingDetailsViewProps, any>{
    render() {
        const { sheriff: { currentWorksite, currentLocation, permanentWorksite, permanentLocation } } = this.props;
        return (
            <div>
                <h3>Worksite Details</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th className="text-left">Worksite</th>
                            <th className="text-left">Location</th>
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
            </div>
        );
    }
}