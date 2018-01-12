import * as React from 'react';
import { connect } from 'react-redux';
import { SheriffAssignment } from '../../../api/index';
import DropAssignmentList from '../components/DropAssignmentList';
import { RootState } from '../../../store/reducers';
import {linkedAssignments} from '../selectors';


export interface LinkedAssignmentListProps{
  assignments?:SheriffAssignment[];
  sheriffId:number;
}


class LinkedAssignmentList extends React.PureComponent<LinkedAssignmentListProps,any>{
  render(){
    const {sheriffId,assignments=[]} = this.props;    
    return (
      <DropAssignmentList assignmentGroupId={sheriffId} assignments={assignments}/>
    )
  }
}

const mapStateToProps = (state:RootState,props:LinkedAssignmentListProps) => {  
  const {sheriffId} = props;
  return {
    assignments:linkedAssignments(sheriffId)(state),
    sheriffId
  }
}


const ConnectedLinkedAssignmentList = connect<LinkedAssignmentListProps,{},LinkedAssignmentListProps>(
  mapStateToProps
)(LinkedAssignmentList)

export default ConnectedLinkedAssignmentList;
