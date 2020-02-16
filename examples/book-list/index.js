import { createStore, combineReducers } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/redux.js'

const book = (state=['React'], action) => {
  switch(action.type) {
    case 'ADD_BOOK':
      return [
        ...state,
        action.newBook
      ]
    case 'UPDATE_BOOK':
      return state.map((book, index) => {
        if (index !== action.index) {
          return book
        }

        return action.newBook
      })
    case 'DELETE_BOOK':
      return state.filter((book, index) => index !== action.index)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  book
})

const store = createStore(rootReducer)
store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'ADD_BOOK', newBook: 'Angular' })
store.dispatch({ type: 'DELETE_BOOK', index: 1 })
store.dispatch({ type: 'UPDATE_BOOK', newBook: 'Redux', index: 0 })

