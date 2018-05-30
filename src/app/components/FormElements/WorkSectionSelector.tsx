import * as React from 'react';
import { FormFieldWrapperProps } from './FormFieldWrapper';
import { WORK_SECTIONS } from '../../api';
import Selector from './Selector';

export interface WorkSectionSelectorProps {
    showVariedOption?: boolean;
}
export default class WorkSectionSelector extends React.PureComponent<FormFieldWrapperProps & WorkSectionSelectorProps> {
    render() {
        const { showVariedOption = false } = this.props;
        let data = Object.keys(WORK_SECTIONS)
            .map((key, index) => ({ key, value: WORK_SECTIONS[key] }))
            .sort((a, b) => a.value.localeCompare(b.value));
        return (
            <Selector
                data={data}
                {...this.props}
                allowNone={true}
                noneLabel="Not Applicable"
                showVariedOption={showVariedOption}
                variedLabel="Work Section Varied"
            />
        );
    }
}