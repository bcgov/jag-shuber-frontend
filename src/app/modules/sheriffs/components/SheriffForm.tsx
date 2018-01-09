import * as React from 'react';
import {
    Form,
    Image,
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    // Grid,
    Col
    // Row
} from 'react-bootstrap';
import {
    Field,
    FieldArray
    //WrappedFieldArrayProps, 
    // WrappedFieldProps 
} from 'redux-form';
import { Validators } from '../../../infrastructure';
import {
    TextFormField,
    TrainingTypeSelector
} from '../../../components/Form';

// import { ImgaeUploader } from 'react-images-upload';


export interface SheriffFormProps {
    handleSubmit: () => void;
}

interface TrainingProps {
    type?: string;

}

class TrainingFieldArray extends FieldArray<TrainingProps> {
    
}

export default class SheriffForm extends React.Component<SheriffFormProps, any>{

    // private renderTraining({ fields }: WrappedFieldArrayProps<TrainingProps>) {
    //     return (
    //         <ul>
    //             <li>
    //                 <button type="button" onClick={() => fields.push({})}>Add Hobby</button>
    //             </li>
    //             {fields.map((hobby, index) =>
    //                 <li key={index}>
    //                     <button
    //                         type="button"
    //                         title="Remove Hobby"
    //                         onClick={() => fields.remove(index)} />
    //                     <Field
    //                         name={hobby}
    //                         type="text"
    //                         component={TextFormField}
    //                         label={`Hobby #${index + 1}`} />
    //                 </li>
    //             )}
    //         </ul>
    //     )
    // }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit}>
                    <Image responsive src="/img/avatar.png" circle width="100" height="100"/>
                    <Col><Field name="firstName" component={TextFormField} label="First Name" validate={[Validators.required]} /></Col>
                    <Col><Field name="lastName" component={TextFormField} label="Last Name" validate={[Validators.required]} /></Col>
                    <Field name="badgeNumber" component={TextFormField} label="Badge Number" validate={[Validators.number, Validators.required]} />
                    
                    <h3>Worksite Details</h3>        
                    <Field name="permanentWorksite" component={TextFormField} label="Permanent Worksite" />
                    <Field name="permanentLocation" component={TextFormField} label="Permanent Location" />
                    <Field name="currentWorksite" component={TextFormField} label="Current Worksite" />
                    <Field name="currentLocation" component={TextFormField} label="Current Location" />
                    
                    <h3>Training</h3>
                    <Form inline >
                    <TrainingFieldArray name="training" component={(p) => {
                        const { fields } = p;
                        return (
                            <ListGroup >
                                <Button bsStyle="success" onClick={() => fields.push({})}>Add</Button>

                                {fields.map((trainingFieldName, index) => {
                                    return (
                                        <ListGroupItem key={index}>                                            
                                            <Field name={`${trainingFieldName}.trainingType`} component={TrainingTypeSelector} label="Training Type " />
                                            
                                            <Field name={`${trainingFieldName}.certificationDate`} component={TextFormField} label="Certification Date" />
                                            
                                            <Field name={`${trainingFieldName}.expiryDate`} component={TextFormField} label="Expiry Date" />
                                            <Button bsStyle="danger" onClick={() => fields.remove(index)}><Glyphicon glyph="trash" /></Button>
                                        </ListGroupItem>)
                                }
                                )}
                            </ListGroup>
                        )
                    }} />
                    </Form> 

                    <Button bsStyle="primary" type="submit" >Save</Button>
                </Form>
            </div>
        );


    }
}
