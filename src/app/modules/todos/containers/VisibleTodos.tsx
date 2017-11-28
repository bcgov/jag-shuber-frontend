import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const getVisibleTodos = (todos:any, filter:string) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter((t:any) => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter((t:any) => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = (state:any) => {
  return {
    todos: getVisibleTodos(state.todos.list, state.todos.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
    onTodoClick: (id:number) => {
      dispatch(toggleTodo(id))
    }
  }
}


const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default DragDropContext(HTML5Backend)(VisibleTodoList);