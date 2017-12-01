import * as React from 'react'
import { connect } from 'react-redux'
import { SheriffTask } from '../../../api/index';
import TaskList from '../components/TaskList'
import {getTasks} from '../actions'
import { RootState } from '../../../store/reducers';
import {unassignedTasks,isLoading} from '../selectors'


export interface UnassignedTaskListProps{
  getTaskList:any;
  tasks:SheriffTask[]
  loading:boolean
}


class UnassignedTaskList extends React.Component<UnassignedTaskListProps,any>{
  componentWillMount(){
    const {getTaskList} = this.props;
    getTaskList();
  }

  render(){
    const {tasks=[],loading=true} = this.props;
    
    if(loading){
      return (
        <div>Loading...</div>
      )
    };
    
    return (
      <TaskList tasks={tasks}/>
    )
  }
}

const mapStateToProps = (state:RootState) => {  
  return {
    tasks:unassignedTasks(state),
    loading:isLoading(state)    
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    getTaskList:()=>dispatch(getTasks())
  }
}

const ConnectedUnassignedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnassignedTaskList)

export default ConnectedUnassignedTaskList;