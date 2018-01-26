import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Table
} from 'react-bootstrap';

export interface TrainingDetailsViewProps {
    sheriff: Sheriff;
}

export default class WorksiteDetailsView extends React.Component<TrainingDetailsViewProps, any>{
    render() {
        const { sheriff: { currentCourthouse, currentRegion, permanentCourthouse, permanentRegion } } = this.props;
        return (
            <div>
                <h3>Region and Courthouse</h3>
                <Table responsive>
                    <thead>
                        <tr>
                            <th> </th>
                            <th className="text-left">Courthouse</th>
                            <th className="text-left">Region</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Permanent</strong></td>
                            <td>{permanentCourthouse}</td>
                            <td>{permanentRegion}</td>
                        </tr>
                        <tr>
                            <td><strong>Current</strong></td>
                            <td>{currentCourthouse}</td>
                            <td>{currentRegion}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}