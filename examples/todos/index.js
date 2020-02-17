import { Component, mount } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/react.js';
import { createStore, combineReducers } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/redux.js';
import { connect } from "https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/react-redux.js";

const uuid = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

const todosInitState = [
  {
    id: uuid(),
    text: 'learn react',
    completed: false
  }
]

const todos = (state=todosInitState, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo
      })
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.id)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  todos
})
const store = createStore(rootReducer)

class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.store = store
  }

  handleClick(e) {
    const target = e.target
    const id = target.parentNode.dataset.id
    const inputText = this.el.querySelector('input').value.trim()
    if (target.classList.contains("add-todo")) {
      this.props.handleAdd(inputText)
    } else if (target.classList.contains("toogle-todo")) {
      this.props.handleToogle(id)
    } else if (target.classList.contains("delete-todo")) {
      this.props.handleDelete(id)
    }
  }

  render() {
    return `
      <div>
        <h1>Todo App</h1>
        <input />
        <button class="add-todo">add</button>
        <ul>
          ${this.props.todos.reduce((result, todo) => result + `
            <div data-id=${todo.id}>
              <li class=${todo.completed ? "completed" : ""}>${todo.text}</li>
              <button class="toogle-todo">toogle</button>
              <button class="delete-todo">delete</button>
            </div>
          `, "")}
        </ul>
      <div>
    `
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleAdd: text => {
      dispatch({
        type: 'ADD_TODO',
        text
      })
    },
    handleToogle: id => {
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    },
    handleDelete: id => {
      dispatch({
        type: 'DELETE_TODO',
        id
      })
    }
  }
}

const root = document.querySelector('#root')
const TodoAppWithRedux = connect(mapStateToProps, mapDispatchToProps)(TodoApp)
const todoApp = new TodoAppWithRedux()

mount(todoApp, root)
