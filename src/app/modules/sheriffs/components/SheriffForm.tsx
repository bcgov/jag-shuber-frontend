import * as React from 'react'
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export interface SheriffFormProps {

}

export default class SheriffForm extends React.Component<SheriffFormProps, any>{
    constructor(props: SheriffFormProps) {
        super(props);
        this.state = {};
    }

    getValidationState(): 'success' | 'error' | 'warning' | undefined {
        if (this.state.value) {
            if (isNaN(this.state.value)) {
                return 'error';
            }
            else {
                return 'success';
            }
        }
        return undefined;
    }

    handleChange(e: any) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div>
                <h2>Add a Sheriff</h2>
                <Form>
                    <FormGroup controlId="formFirstName">
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter First Name" />
                    </FormGroup>

                    <FormGroup controlId="formLastName">
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl type="text" placeholder="Enter Last Name" />
                    </FormGroup>

                    <FormGroup controlId="formBadgeNumber" validationState={this.getValidationState()}>
                        <ControlLabel>Badge Number</ControlLabel>
                        <FormControl type="text" value={this.state.badgeNumber} placeholder="Enter Badge Number" onChange={(e) => this.handleChange(e)} />
                    </FormGroup>

                    <Button type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        );


    }
}