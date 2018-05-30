import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Courtroom } from '../api/index';
import { allCourtrooms } from '../modules/courthouse/selectors';
import { FormFieldWrapperProps } from '../components/FormElements/FormFieldWrapper';
import Selector from '../components/FormElements/Selector';

interface CourthouseCourtroomListStateProps {
    courtrooms: Courtroom[];
}

interface CourthouseCourtroomListProps extends FormFieldWrapperProps {
    courtrooms?: Courtroom[];
}

class CourthouseCourtroomList extends React.PureComponent<
    CourthouseCourtroomListProps & CourthouseCourtroomListStateProps> {

    render() {
        const { courtrooms = [], ...restProps } = this.props;
        const selectorValues = courtrooms.map(courtroom => ({ key: courtroom.id, value: courtroom.name }));
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

// tslint:disable-next-line:max-line-length
export default connect<CourthouseCourtroomListStateProps, {}, CourthouseCourtroomListProps>(
    mapStateToProps
)(CourthouseCourtroomList);