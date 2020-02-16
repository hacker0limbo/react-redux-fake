import { Component, mount } from 'https://raw.githack.com/hacker0limbo/react-redux-fake/master/src/react.js'

class LikeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: false
    }
  }

  handleClick() {
    this.setState({
      liked: !this.state.liked
    })
  }

  render() {
    return `
      <div>
        <h1>Thumb Up Switcher</h1>
        <button style="color: ${this.props.fontColor}">
          ${this.state.liked ? 'Unlike it' : 'Like it'}
        </button>
        <span>${this.state.liked ? '👍' : '👎'}</span>
        <hr />
      </div>
    `
  }
}

const root = document.querySelector('#root')
const likeButton = new LikeButton({ fontColor: 'red' })

mount(likeButton, root)
