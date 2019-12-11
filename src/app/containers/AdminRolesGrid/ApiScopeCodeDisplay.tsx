import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { ApiScope } from '../../api';

import { RootState } from '../../store';
import { getAllApiScopes } from '../../modules/roles/selectors';

interface ApiScopeCodeDisplayStateProps {
    apiScopes?: ApiScope[];
    input?: any;
}

class ApiScopeCodeDisplay extends React.PureComponent<
    ApiScopeCodeDisplayStateProps & SelectorProps> {

    render() {
        const {
            apiScopes = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = apiScopes.map(scope => ({
                key: scope.id as string,
                value: scope.scopeCode as string
            }));

            const match = values.find((item) => item.key === value);

            if (match) {
                return (
                    <h6 className="table-cell-text">{match.value}</h6>
                );
            }
        }

        return <h6>Not Specified</h6>;
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
