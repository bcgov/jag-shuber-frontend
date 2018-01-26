import * as React from 'react';
import { Sheriff } from '../api/index';
import {
    Table,
    Glyphicon
} from 'react-bootstrap';

export interface TrainingDetailsViewProps {
    sheriff: Sheriff;
    isLimited?: boolean;
}

export default class TrainingDetailsView extends React.Component<TrainingDetailsViewProps, any>{
   trainingStatusStyle():string { 
        return "text-success";
    }
    
    render() {
        const { sheriff: { training = [] }, isLimited = false} = this.props;
        return (
            <div>
                <h3>Training</h3>
                { training.length > 0 && (
                    <Table responsive>
                        <thead>
                            <tr >
                                <th className="text-left">Type</th>
                                { !isLimited && <th className="text-left">Cert</th>}
                                { !isLimited && <th className="text-left">Expiry</th>}
                                <th className="text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {training.map(function (training, index) {
                        return (
                            <tr key={index}>
                                <td>{training.trainingType}</td>
                                { !isLimited && <td>{training.certificationDate.toString().substring(3, 15)}</td>}
                                { !isLimited && <td>{training.expiryDate.toString().substring(3, 15)}</td>}
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