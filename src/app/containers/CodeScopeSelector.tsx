import React from 'react';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

class CodeScopeSelector extends React.PureComponent<SelectorProps> {
    render() {
        const { ...restProps } = this.props;

        const selectorValues = [
            { key: 0, value: 'All Locations' },
            { key: 1, value: 'Current Location' }
        ];

        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

export default CodeScopeSelector;
