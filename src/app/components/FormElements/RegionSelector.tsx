import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { REGIONS } from '../../api';
import Selector from './Selector';

export default class RegionSelector extends React.PureComponent<FormFieldWrapperProps>{
    render() {
        const data = Object.keys(REGIONS).map((key, index) => ({ key, value: REGIONS[key] }));
        return (
            <Selector data={data} {...this.props} />
        );
    }
}