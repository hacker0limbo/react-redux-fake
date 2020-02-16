# React-Redux Fake

模拟实现 React 和 Redux

## 安装:

直接使用[raw githack](https://raw.githack.com/)或者[jsdelivr](https://www.jsdelivr.com/) cdn 链接, 这里以 `jsdelivr` 为例

```javascript
import { Component, mount, createDOMFromString } from 'https://cdn.jsdelivr.net/gh/hacker0limbo/react-redux-fake/src/react.js'
import { createStore, combineReducers, compose } from 'https://cdn.jsdelivr.net/gh/hacker0limbo/react-redux-fake/src/redux.js'
import { connect } from 'https://cdn.jsdelivr.net/gh/hacker0limbo/react-redux-fake/src/react-redux.js'
```

## 示例

以下例子均以计数器为例子, `root`为页面中自定义的根元素

### React
```javascript
class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick(e) {
    const target = e.target
    if (target.classList.contains('inc')) {
      this.setState({
        count: this.state.count + 1
      })
    } else if (target.classList.contains('dec')) {
      this.setState({
        count: this.state.count - 1
      })
    }
  }

  render() {
    return `
      <div>
        <div>Counter in React</div>
        <button class="inc">increment</button>
        <button class="dec">decrement</button>
        <span>${this.state.count}</span>
      </div>
    `
  }
}

const counter = new Counter()
mount(counter, root)
```

### Redux
```javascript
const counterReducer = (state={ count: 0 }, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count += 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count -= 1
      }
    default:
      return state
  }
}

const store = createStore(counterReducer)
store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'INCREMENT' }) // { count: 1 }
store.dispatch({ type: 'DECREMENT' }) // { count: 0 }
```

### React-Redux
```javascript
class Counter extends Component {
  constructor(props) {
    super(props)
    // store 继续使用上述 redux 里面的 store
    this.store = store
  }

  handleClick(e) {
    const target = e.target
    if (target.classList.contains('inc')) {
      this.props.handleIncrement()
    } else if (target.classList.contains('dec')) {
      this.props.handleDecrement()
    }
  }

  render() {
    return `
      <div>
        <div>Counter in React Redux</div>
        <button class="inc">increment</button>
        <button class="dec">decrement</button>
        <span>${this.props.count}</span>
      </div>
    `
  }
}

const mapStateToProps = state => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleIncrement: () => {
      dispatch({ type: 'INCREMENT' })
    },
    handleDecrement: () => {
      dispatch({ type: 'DECREMENT' })
    }
  }
}

const CounterWithReactRedux = connect(mapStateToProps, mapDispatchToProps)(Counter)
const counterWithReactRedux = new CounterWithReactRedux()
mount(counterWithReactRedux, root)
```

更多示例参考 [examples](https://github.com/hacker0limbo/react-redux-fake/tree/master/examples)

## 参考
- https://github.com/huzidaha/reactjs-in-40