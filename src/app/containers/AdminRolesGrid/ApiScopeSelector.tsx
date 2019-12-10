import React from 'react';
import { connect } from 'react-redux';

import Selector, { SelectorProps } from '../../components/FormElements/Selector';

import { ApiScope } from '../../api';

import { RootState } from '../../store';
import { getAllApiScopes } from '../../modules/roles/selectors';

interface ApiScopeSelectorStateProps {
    apiScopes?: ApiScope[];
}

class ApiScopeSelector extends React.PureComponent<
    ApiScopeSelectorStateProps & SelectorProps> {

    render() {
        const {
            apiScopes = [],
            ...restProps
        } = this.props;
        const selectorValues = apiScopes.map(apiScope => ({ key: apiScope.id as string, value: apiScope.scopeName as string }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        apiScopes: getAllApiScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<ApiScopeSelectorStateProps, {}, SelectorProps>(
    mapStateToProps
)(ApiScopeSelector);
