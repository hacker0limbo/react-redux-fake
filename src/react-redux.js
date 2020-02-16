export const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => {
  return class extends WrappedComponent {
    constructor(props) {
      super(props)
      this.updateProps()
      // 假设组件里面已经有了 this.store
      this.store.subscribe(() => this.updateProps())
    }

    updateProps() {
      const stateProps = mapStateToProps ? mapStateToProps(this.store.getState(), this.props) : {}
      const dispatchProps = mapDispatchToProps ? mapDispatchToProps(this.store.dispatch, this.props) : {}
      this.props = {
        ...this.props,
        ...dispatchProps,
        ...stateProps
      }

      // 一旦 props 改变, 强制重新 render
      this.setState({ 
        ...this.state 
      })
    }
  }
}
