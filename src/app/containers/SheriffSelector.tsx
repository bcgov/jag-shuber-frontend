import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Sheriff } from '../api/index';
import { sheriffs } from '../modules/sheriffs/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface SheriffListStateProps {
    sheriffList: Sheriff[];
}

interface SheriffListProps extends FormFieldWrapperProps {
    sheriffList?: Sheriff[];
    showVariedOption?: boolean;
}

class SheriffList extends React.PureComponent<
    SheriffListProps & SheriffListStateProps> {

    render() {
        const { sheriffList = [], showVariedOption = false, ...restProps } = this.props;
        const selectorValues = Object.keys(sheriffList).map((key, index) =>
            ({
                key: sheriffList[key].id,
                value: `${sheriffList[key].lastName}, ${sheriffList[key].firstName}`
            }));

        return (
            <Selector
                {...restProps}
                data={selectorValues}
                allowNone={true}
                noneLabel="Not Assigned"
                showVariedOption={showVariedOption}
                variedLabel="Sheriffs Varied"
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        sheriffList: sheriffs(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffListStateProps, {}, SheriffListProps>(
    mapStateToProps
)(SheriffList);