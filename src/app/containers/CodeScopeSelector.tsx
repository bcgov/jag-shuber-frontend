import React from 'react';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

class CodeScopeSelector extends React.PureComponent<SelectorProps> {
    render() {
        const { ...restProps } = this.props;

        const selectorValues = [
            { key: 1, value: 'General Role' },
            { key: 0, value: 'Location Specific Role' }
        ];

        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

export default CodeScopeSelector;
