import React from 'react';
import { connect } from 'react-redux';

import { SelectorProps } from '../../../components/FormElements/Selector';

import { SheriffRank } from '../../../api';

import { RootState } from '../../../store';
import { allEffectiveSheriffRankCodes, allSheriffRankCodes } from '../../../modules/sheriffs/selectors';

interface SheriffRankDisplayStateProps {
    sheriffRanks?: SheriffRank[];
    input?: any;
}

class SheriffRankDisplay extends React.PureComponent<
    SheriffRankDisplayStateProps & SelectorProps> {

    render() {
        const {
            sheriffRanks = [],
            input
        } = this.props;

        const value = (input && input.value) ? input.value : null;

        if (value) {
            const values = sheriffRanks.map(rank => ({
                key: rank.code as string,
                value: rank.description as string
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
        sheriffRanks: allSheriffRankCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffRankDisplayStateProps, {}, SelectorProps>(
    mapStateToProps
)(SheriffRankDisplay);
