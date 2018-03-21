import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { 
    FormControl,
    Button,
    Glyphicon
} from 'react-bootstrap';

export default class NumberSpinner extends React.PureComponent<FormFieldWrapperProps>{
    onClickSubtract () {
        let newValue = Number(this.props.input.value) - 1;
        this.props.input.value = newValue;
        this.props.input.onChange(newValue);
    }
    
    onClickAdd () {
        let newValue = Number(this.props.input.value) + 1;
        this.props.input.value = newValue;
        this.props.input.onChange(newValue);
    }
    render() {
        const {input: {value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <div className="input-group">
                    <div className="input-group-btn">
                        <Button bsStyle="primary" onClick={() => this.onClickSubtract()}><Glyphicon glyph="minus"/></Button>
                    </div>
                    <FormControl type="text" placeholder={`Enter ${label}`} value={value} onChange={onChange} />
                    <div className="input-group-btn">
                        <Button bsStyle="primary" onClick={() => this.onClickAdd()}><Glyphicon glyph="plus"/></Button>
                    </div>
                </div>
            </FormFieldWrapper>
        );
    }
}