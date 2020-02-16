export const createStore = (reducer, state) => {
  const listeners = []
  const subscribe = listener => listeners.push(listener)
  const getState = () => state
  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  // state 可选, 如果不提供(为 undefined), 那么可以在声明 reducer 的时候提供
  // 此时 dispatch 一个空的 action, 在 store 里面初始化 state
  if (!state) {
    dispatch({})
  }

  return { getState, dispatch, subscribe }
}

export const combineReducers = reducers => {
  // reducers 是一个对象: { r1, r2 }
  // 将所有的 reducers 集合起来, 对 reducer 里面的状态进行集合, 整合成一个新的 state
  return (state={}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action)
      return nextState
    }, {})
  }
}

export const compose = (...funcs) => {
  // 将原本想要 f1(f2(x)) 调用的, 变成 compose(f1, f2)(x) 格式
  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((outerFn, innerFn) => ((...args) => outerFn(innerFn(...args))))
}