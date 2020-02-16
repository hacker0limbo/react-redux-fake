export const createDOMFromString = (html) => {
  const div = document.createElement('div')
  div.insertAdjacentHTML('beforeend', html)
  return div
}

export const mount = (component, root) => {
  root.insertAdjacentElement('beforeend', component.renderDOM())
  component.onStateChange = (oldEl, newEl) => {
    root.insertBefore(newEl, oldEl)
    root.removeChild(oldEl)
  }
}

/**
 * 1, 一旦状态发生改变，就重新调用 render 方法(在 setState 里面)，构建一个新的 DOM 元素
 * 2, 每当 setState 中构造完新的 DOM 元素以后，就会通过 onStateChange 告知外部插入新的 DOM 元素，然后删除旧的元素，页面就更新了
 * 3, 调用过程:
 *  1, 用户触发 handleClick 监听器
 *  2, 调用 setState, 重新设置 state, 并触发 renderDom, 根据 render 返回的 html, 重新渲染视图里有关状态的数据, 并重新绑定监听器
 *  3, 调用 onStateChange, 根据 render 之后返回的最新元素插入到页面, 这里 onStateChange 可以自定义
 */
export class Component {
  constructor(props={}) {
    this.props = props
    this.el = null
    this.state = {}
  }

  onStateChange(oldEl, newEl) {
    console.log('state changed')
  }

  setState(newState) {
    const oldEl = this.el
    this.state = { 
      ...this.state, 
      ...newState 
    }
    this.el = this.renderDOM()
    this.onStateChange(oldEl, this.el)
  }

  handleClick(e) {
    console.log('clicked')
  }

  render() {
    return '<div></div>'
  }

  renderDOM() {
    this.el = createDOMFromString(this.render())
    this.el.addEventListener('click', e => this.handleClick(e), false)

    return this.el
  }
}
