import * as React from 'react';
import { WrappedFieldProps } from 'redux-form';
import { FormGroup, ControlLabel, Checkbox } from 'react-bootstrap';


export default class SheriffQualificationsChecklist extends React.PureComponent<WrappedFieldProps & {label:string}>{
    render(){
        const {input:{value, onChange}, label} = this.props;
        return (
            <FormGroup>
               <ControlLabel>{label}</ControlLabel>
               <Checkbox onChange={onChange} value={value}>
                   Transfers
               </Checkbox>
               {' '}
               <Checkbox onChange={onChange} value={value}>
                   Court Appearances
               </Checkbox>
               {' '}
               <Checkbox onChange={onChange} value={value}>
                   Sign Documents
               </Checkbox>
               {' '}
            </FormGroup>
        );
    }
}