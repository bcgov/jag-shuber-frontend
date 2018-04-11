import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { COURTROOMS } from '../../api';
import Selector from './Selector';

export default class CourtroomSelector extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const data = Object.keys(COURTROOMS).map((key, index) => ({ key, value: COURTROOMS[key] }));
        return (
            <Selector data={data} {...this.props} />
        );
    }
}