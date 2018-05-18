import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { SheriffRank } from '../api/Api';
import { allSheriffRankCodes } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseSheriffRankListStateProps {
    sheriffRanks: SheriffRank[];
}

interface CourthouseSheriffRankListProps extends FormFieldWrapperProps {
}

class CourthouseSheriffRankList extends React.PureComponent<
    CourthouseSheriffRankListProps & CourthouseSheriffRankListStateProps> {

    render() {
        const { sheriffRanks = [], ...restProps } = this.props;
        const selectorValues = 
            Object.keys(sheriffRanks).map((key, index) => ({key, value: sheriffRanks[key].description}));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        sheriffRanks: allSheriffRankCodes(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseSheriffRankListStateProps, {}, CourthouseSheriffRankListProps>(
    mapStateToProps
  )(CourthouseSheriffRankList);