import * as React from 'react'
import { connect } from 'react-redux'
import { SheriffTask } from '../../../api/index';
import DropTaskList from '../components/DropTaskList'
import { RootState } from '../../../store/reducers';
import {assignedTasks} from '../selectors'
import {assignTask} from '../actions'


export interface AssignedTaskListProps{
  tasks?:SheriffTask[]
  sheriffId:number
  assignTask?:(task:SheriffTask)=>void;
}


class AssignedTaskList extends React.PureComponent<AssignedTaskListProps,any>{
  render(){
    const {tasks=[],assignTask} = this.props;    
    return (
      <DropTaskList onDropTask={assignTask} tasks={tasks}/>
    )
  }
}

const mapStateToProps = (state:RootState,props:AssignedTaskListProps) => {  
  const {sheriffId} = props;
  return {
    tasks:assignedTasks(sheriffId)(state),
    sheriffId
  }
}

const mapDispatchToProps = (dispatch:any,ownProps:AssignedTaskListProps)=>{
  const {sheriffId}=ownProps;
  return {
    assignTask:(t:SheriffTask)=> dispatch(assignTask(t.id,sheriffId))
  }
}

const ConnectedUnassignedTaskList = connect<AssignedTaskListProps,{},AssignedTaskListProps>(
  mapStateToProps,
  mapDispatchToProps
)(AssignedTaskList)

export default ConnectedUnassignedTaskList;