import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courtroom } from '../api/index';
import { allCourtrooms } from '../modules/courthouse/selectors';
import { getCourtrooms } from '../modules/courthouse/action';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseCourtroomListDispatchProps {
    getCourtrooms?: () => void;
}

interface CourthouseCourtroomListStateProps {
    courtrooms: Courtroom[];
}

interface CourthouseCourtroomListProps extends FormFieldWrapperProps {
    courtrooms?: Courtroom[];
}

class CourthouseCourtroomList extends React.PureComponent<
    CourthouseCourtroomListProps & CourthouseCourtroomListDispatchProps & CourthouseCourtroomListStateProps> {

    componentWillMount() {
        const { getCourtrooms } = this.props;
        getCourtrooms && getCourtrooms();
    }

    render() {
        const { courtrooms = [], ...restProps } = this.props;
        const selectorValues = Object.keys(courtrooms).map((key, index) => ({key, value: courtrooms[key].name}));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        courtrooms: allCourtrooms(state)
    };
};

const mapDispatchToProps = {
    getCourtrooms: getCourtrooms
};

// tslint:disable-next-line:max-line-length
export default connect<CourthouseCourtroomListStateProps, CourthouseCourtroomListDispatchProps, CourthouseCourtroomListProps>(
    mapStateToProps,
    mapDispatchToProps
  )(CourthouseCourtroomList);