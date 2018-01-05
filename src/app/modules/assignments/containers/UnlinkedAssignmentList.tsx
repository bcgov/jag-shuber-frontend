import * as React from 'react';
import { connect } from 'react-redux';
import { SheriffAssignment } from '../../../api/index';
import AssignmentList from '../components/AssignmentList';
import {getAssignments} from '../actions';
import { RootState } from '../../../store/reducers';
import {unlinkedAssignments,isLoading} from '../selectors';


export interface UnlinkedAssignmentListProps{
  getAssignmentList:any;
  assignments:SheriffAssignment[];
  loading:boolean;
}


class UnassignedAssignmentList extends React.Component<UnlinkedAssignmentListProps,any>{
  componentWillMount(){
    const {getAssignmentList} = this.props;
    getAssignmentList();
  }

  render(){
    const {assignments=[],loading=true} = this.props;
    
    if(loading){
      return (
        <div>Loading...</div>
      )
    };
    
    return (
      <AssignmentList assignments={assignments}/>
    )
  }
}

const mapStateToProps = (state:RootState) => {  
  return {
    assignments:unlinkedAssignments(state),
    loading:isLoading(state)    
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    getAssignmentList:()=>dispatch(getAssignments())
  }
}

const ConnectedUnlinkedAssignmentList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnassignedAssignmentList)

export default ConnectedUnlinkedAssignmentList;