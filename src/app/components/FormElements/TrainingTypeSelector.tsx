import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { TRAINING_TYPES } from '../../api';
import Selector from './Selector';

export default class TrainingTypeSelector extends React.PureComponent<FormFieldWrapperProps> {
    render() {
        const data = Object.keys(TRAINING_TYPES).map((key, index) => ({ key, value: TRAINING_TYPES[key] }));
        return (
            <Selector data={data} {...this.props} />
        );
    }
}