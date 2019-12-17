import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { ApiScope } from '../../api';

import { RootState } from '../../store';
import { getAllApiScopes } from '../../modules/roles/selectors';

interface ApiScopeDisplayStateProps {
    apiScopes?: ApiScope[];
    input?: any;
}

class ApiScopeDisplay extends React.PureComponent<
    ApiScopeDisplayStateProps & SelectorProps> {

    render() {
        const {
            apiScopes = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = apiScopes.map(scope => ({
                key: scope.id as string,
                value: scope.scopeName as string
            }));

            const match = values.find((item) => item.key === value);

            if (match) {
                return (
                    <span className="table-cell-text">{match.value}</span>
                );
            }
        }

        return <span className="table-cell-text">Not Specified</span>;
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        apiScopes: getAllApiScopes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<ApiScopeDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(ApiScopeDisplay);
