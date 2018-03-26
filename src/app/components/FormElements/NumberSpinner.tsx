import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import { 
    FormControl,
    Button,
    Glyphicon
} from 'react-bootstrap';

export interface NumberSpinnerProps {
    minValue?: number;
    maxValue?: number; 
}
export default class NumberSpinner extends React.PureComponent<FormFieldWrapperProps & NumberSpinnerProps> {    
    onClick(shouldIncrement: boolean) {
        const { minValue = 1, maxValue = 50 } = this.props;
        let value  = Number(this.props.input.value);
        if (!isNaN(value)) {
            if (shouldIncrement) {
                if (value < maxValue) {
                    value++;
                } else {
                    value = maxValue;
                }
            } else {
                if (value > minValue && value > maxValue) {
                    value = maxValue;
                } else if (value > minValue) {
                    value--;
                }
            }
        } else {
            value = 1;
        }
        this.props.input.value = value;
        this.props.input.onChange(value);
    }
    render() {
        const {input: {value, onChange}, label} = this.props;
        return (
            <FormFieldWrapper {...this.props}>
                <div className="input-group">
                    <div className="input-group-btn">
                        <Button 
                            bsStyle="primary" 
                            onClick={() => this.onClick(false)}
                        >
                            <Glyphicon glyph="minus"/>
                        </Button>
                    </div>
                    <FormControl type="text" placeholder={`Enter ${label}`} value={value} onChange={onChange} />
                    <div className="input-group-btn">
                        <Button 
                            bsStyle="primary" 
                            onClick={() => this.onClick(true)}
                        >
                            <Glyphicon glyph="plus"/>
                        </Button>
                    </div>
                </div>
            </FormFieldWrapper>
        );
    }
}