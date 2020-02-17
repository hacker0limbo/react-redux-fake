import { Component, mount } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/react.js';
import { createStore, combineReducers } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/redux.js';
import { connect } from "https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/react-redux.js";

const uuid = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

const todos = (state=[], action) => {
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

  render() {
    return `
      <div>
        <h1>Todo App</h1>
        <input />
        <button>add</button>
        <ul>
          <div>
            <li>1</li>
            <button>toogle</button>
            <button>delete</button>
          </div>
          <div>
            <li>1</li>
            <button>toogle</button>
            <button>delete</button>
          </div>
          <div>
            <li>1</li>
            <button>toogle</button>
            <button>delete</button>
          </div>
        </ul>
      <div>
    `
  }
}

const root = document.querySelector('#root')
const todoApp = new TodoApp()

mount(todoApp, root)
