import * as React from 'react';
import { Sheriff } from '../../../api/index';
import {
    Table,
    Glyphicon
} from 'react-bootstrap';

export interface TrainingDetailsViewProps {
    sheriff: Sheriff;
}

export default class TrainingDetailsView extends React.Component<TrainingDetailsViewProps, any>{
   trainingStatusStyle():string { 
        return "text-success";
    }
    
    render() {
        const { sheriff: { training } } = this.props;
        return (
            <div>
                <h3>Training</h3>
                <Table responsive>
                    <thead>
                        <tr >
                            <th className="text-left">Type</th>
                            <th className="text-left">Cert</th>
                            <th className="text-left">Expiry</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {training.map(function (training, index) {
                    return (
                        <tr key={index}>
                            <td>{training.trainingType}</td>
                            <td>{training.certificationDate.toString().substring(3, 15)}</td>
                            <td>{training.expiryDate.toString().substring(3, 15)}</td>
                            <td><Glyphicon glyph="ok" className="text-success" /></td>
                        </tr>
                    );
                })}
                    </tbody>
                </Table>

            </div>
        );
    }
}