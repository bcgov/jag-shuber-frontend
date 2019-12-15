import React from 'react';
import { connect } from 'react-redux';

import Selector, { SelectorProps } from '../../components/FormElements/Selector';

import { FrontendScope } from '../../api';

import { RootState } from '../../store';
import { getAllFrontendScopes } from '../../modules/roles/selectors';

interface FrontendScopeSelectorStateProps {
    frontendScopes?: FrontendScope[];
}

class FrontendScopeSelector extends React.PureComponent<
    FrontendScopeSelectorStateProps & SelectorProps> {

    render() {
        const {
            frontendScopes = [],
            ...restProps
        } = this.props;
        // console.log('frontend scopes');
        // console.log(frontendScopes);
        const selectorValues = frontendScopes.map(frontendScope => ({ key: frontendScope.id as string, value: frontendScope.scopeName as string }));
        // console.log('selector values');
        // console.log(selectorValues);
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        frontendScopes: getAllFrontendScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<FrontendScopeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(FrontendScopeSelector);
