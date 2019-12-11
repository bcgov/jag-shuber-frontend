import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { ApiScope } from '../../api';

import { RootState } from '../../store';
import { getAllApiScopes } from '../../modules/roles/selectors';

interface ApiScopeCodeDisplayStateProps {
    apiScopes?: ApiScope[];
}

class ApiScopeCodeDisplay extends React.PureComponent<
    ApiScopeCodeDisplayStateProps & SelectorProps> {

    render() {
        const {
            apiScopes = [],
            ...restProps
        } = this.props;
        const values = apiScopes.map(apiScope => ({ key: apiScope.id as string, value: apiScope.scopeCode as string }));
        if (values.length < 1) return null;
        return (
            <h6 className="table-cell-text">{values[0].value}</h6>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        apiScopes: getAllApiScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<ApiScopeCodeDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(ApiScopeCodeDisplay);
