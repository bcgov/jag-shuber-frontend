import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../components/FormElements/Selector';

import { ApiScope } from '../../api';

import { RootState } from '../../store';
import { getAllApiScopes } from '../../modules/roles/selectors';

interface ApiScopeDescriptionDisplayStateProps {
    apiScopes?: ApiScope[];
    input?: any;
}

class ApiScopeDescriptionDisplay extends React.PureComponent<
    ApiScopeDescriptionDisplayStateProps & SelectorProps> {

    render() {
        const {
            apiScopes = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = apiScopes.map(scope => ({
                key: scope.id as string,
                value: scope.description as string
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
export default connect<ApiScopeDescriptionDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(ApiScopeDescriptionDisplay);
