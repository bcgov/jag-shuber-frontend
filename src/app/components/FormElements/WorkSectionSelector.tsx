import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { WORK_SECTIONS } from '../../api';
import Selector from './Selector';

export default class WorkSectionSelector extends React.PureComponent<FormFieldWrapperProps> {
    render() {        
        let data = Object.keys(WORK_SECTIONS).map((key, index) => ({key, value: WORK_SECTIONS[key]}));
        data.push({key: 'NA', value: 'Not Applicable'});
        return (
            <Selector data={data} {...this.props}/>
        );
    }
}