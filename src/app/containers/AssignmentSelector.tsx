import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { 
    DateRange, 
    Assignment,
    WorkSectionCode 
} from '../api/Api';
import Selector, { SelectorProps } from '../components/FormElements/Selector';
import {
    getAssignments
} from '../modules/assignments/actions';
import {
    allAssignments
} from '../modules/assignments/selectors';
import { visibleTime } from '../modules/schedule/selectors';

interface AssignmentSelectorProps {
    workSectionId?: WorkSectionCode;
    label?: string;
}
interface AssignmentSelectorStateProps {
    assignments: Assignment[];
    visibleTimeStart: any;
    visibleTimeEnd: any;
}

interface AssignmentSelectorDispatchProps {
    fetchAssignments: (dateRange: DateRange) => void;
}

class AssignmentSelector extends React.PureComponent<
    SelectorProps & AssignmentSelectorStateProps & AssignmentSelectorDispatchProps & AssignmentSelectorProps> {

    componentWillMount() {
        const {
            fetchAssignments,
            visibleTimeEnd: endDate, 
            visibleTimeStart: startDate
        } = this.props;

        const dateRange = { startDate, endDate };
        // tslint:disable-next-line:no-unused-expression
        fetchAssignments && fetchAssignments(dateRange);
    }
    
    componentWillReceiveProps(nextProps: AssignmentSelectorDispatchProps & AssignmentSelectorStateProps) {
        const {
            visibleTimeStart: prevStartDate,
            visibleTimeEnd: prevEndDate
        } = this.props;
        const {
            visibleTimeStart: nextStartDate,
            visibleTimeEnd: nextEndDate,
            fetchAssignments
        } = nextProps;

        if (!moment(prevStartDate).isSame(moment(nextStartDate)) || !moment(prevEndDate).isSame(moment(nextEndDate))) {
            const dateRange = { startDate: nextStartDate, endDate: nextEndDate };
            // tslint:disable-next-line:no-unused-expression
            fetchAssignments && fetchAssignments(dateRange);
        }
    }

    render() {
        const { assignments = [], workSectionId, label, ...restProps } = this.props;
        const workSectionAssignments = assignments.filter(a => a.workSectionId == workSectionId);
        const selectorValues = workSectionAssignments.map(a => ({ key: a.id, value: a.title }));
        return (
            <Selector {...restProps} data={selectorValues} label={label} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    const currentVisibleTime = visibleTime(state);
    return {
        assignments: allAssignments(state),
        ...currentVisibleTime
    };
};

// tslint:disable-next-line:max-line-length
export default connect<AssignmentSelectorStateProps, AssignmentSelectorDispatchProps, SelectorProps>(
    mapStateToProps, 
    {
        fetchAssignments: getAssignments
    }
)(AssignmentSelector);