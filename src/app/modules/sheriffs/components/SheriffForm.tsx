import * as React from 'react';
import {
    Form,
    Image,
    Button,
    ListGroup,
    ListGroupItem,
    Glyphicon
} from 'react-bootstrap';
import {
    Field,
    FieldArray,
    InjectedFormProps
} from 'redux-form';
import { Validators } from '../../../infrastructure';
import {
    TextFormField,
    DateField
} from '../../../components/Form';
import { default as TrainingTypeSelector } from '../../training/components/TrainingTypeSelector';
import { default as RegionSelector } from '../../worksite/components/RegionSelector';
import { default as CourthouseSelector } from '../../worksite/components/CourthouseSelector';

export interface SheriffFormProps {
    handleSubmit?: () => void;
    onSubmitSuccess?: () => void;
}

interface TrainingProps {
    type?: string;
}

class TrainingFieldArray extends FieldArray<TrainingProps> {

}

export default class SheriffForm extends React.Component<SheriffFormProps & InjectedFormProps<any,SheriffFormProps>, any>{

    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <Form onSubmit={handleSubmit} >

                    <Image responsive src="/img/avatar.png" circle width="150" height="150" />
                    <br />
                    <Field name="firstName" component={TextFormField} label="First Name" validate={[Validators.required]} />
                    <Field name="lastName" component={TextFormField} label="Last Name" validate={[Validators.required]} />
                    <Field name="badgeNumber" component={TextFormField} label="Badge Number" validate={[Validators.number, Validators.required]} />

                    <br />
                    
                    <h3>Region and Courthouse</h3>
                    <Field name="permanentRegion" component={RegionSelector} label="Permanent Region" />
                    <Field name="permanentCourthouse" component={CourthouseSelector} label="Permanent Courthouse" />
                    <Field name="currentRegion" component={RegionSelector} label="Current Region" />
                    <Field name="currentCourthouse" component={CourthouseSelector} label="Current Courthouse" />
                   
                    <br />
                    <h3>Training</h3>
                    <TrainingFieldArray name="training" component={(p) => {
                        const { fields } = p;
                        return (
                            <ListGroup >
                                {fields.map((trainingFieldName, index) => {
                                    return (
                                        <ListGroupItem key={index}>              
                                         <Button bsStyle="danger" onClick={() => fields.remove(index)} className="pull-right"><Glyphicon glyph="trash" /></Button><br/>                                                                     
                                            <Field name={`${trainingFieldName}.trainingType`} component={TrainingTypeSelector} label="Training Type " />
                                            <Field name={`${trainingFieldName}.certificationDate`} component={DateField} label="Certification Date" />
                                            <Field name={`${trainingFieldName}.expiryDate`} component={DateField} label="Expiry Date" />
                                        </ListGroupItem>)
                                }
                                )}
                                <br/>
                                <Button onClick={() => fields.push({})} ><Glyphicon glyph="plus" /></Button>
                            </ListGroup>
                        )
                    }} />
                </Form>

            </div>
        );


    }
}
