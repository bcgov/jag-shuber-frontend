import * as React from 'react';
import { SheriffTraining } from '../api/index';
import {
    Table,
    Glyphicon
} from 'react-bootstrap';

export interface SheriffTrainingDetailsProps {
    training: SheriffTraining[];
    isSummary?: boolean;
}

export default class SheriffTrainingDetails extends React.Component<SheriffTrainingDetailsProps, any>{
   trainingStatusStyle():string { 
        return "text-success";
    }
    
    render() {
        const { training = [], isSummary = false} = this.props;
        return (
            <div>
                <h3>Training</h3>
                { training.length > 0 && (
                    <Table responsive>
                        <thead>
                            <tr >
                                <th className="text-left">Type</th>
                                { !isSummary && <th className="text-left">Cert</th>}
                                { !isSummary && <th className="text-left">Expiry</th>}
                                <th className="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {training.map(function (training, index) {
                        return (
                            <tr key={index}>
                                <td>{training.trainingType}</td>
                                { !isSummary && <td>{training.certificationDate.toString().substring(3, 15)}</td>}
                                { !isSummary && <td>{training.expiryDate.toString().substring(3, 15)}</td>}
                                <td><Glyphicon glyph="ok" className="text-success" /></td>
                            </tr>
                        );
                })}
                    </tbody>
                </Table> )}
                {  training.length == 0 && (
                    <span className="text-danger">No training recorded. </span>
                )}
            </div>
        );
    }
}