import * as React from 'react'
import * as PropTypes from 'prop-types'
import {default as Todo} from './Todo'
import {ListGroup} from 'react-bootstrap'
import Square from './Square'

export interface TodoContract{
    id:number
    completed:boolean
    text:string
}


export interface TodoListProps{
    todos:TodoContract[]
    onTodoClick:(id:number)=>void;   
}

class TodoList extends React.PureComponent<TodoListProps,any>{
    static propTypes = {
        todos: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
          }).isRequired
        ).isRequired,
        onTodoClick: PropTypes.func.isRequired
      }

    render(){
        const {todos,onTodoClick} = this.props;
        return (
            <div>
            <Square/>
            <ListGroup>
            {todos.map(todo => (
              <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
            ))}
          </ListGroup>

          </div>
        )
    }
}

export default TodoList