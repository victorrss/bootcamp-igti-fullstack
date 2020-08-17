import React, { Component } from 'react';
import { getNewTimestamp } from './helpers/dateTimeHelpers'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      clickArray: [],

    }
  }

  handleClick = () => {
    const newClickArray = Object.assign([], this.state.clickArray)
    newClickArray.push(getNewTimestamp())
    this.setState({ clickArray: newClickArray })
  }

  componentDidUpdate() {
    document.title = this.state.clickArray.length.toString()
  }
  
  render() {

    const { clickArray } = this.state;

    return (
      <div>
        <h3>React e <em>Class Component</em></h3>
        <button onClick={this.handleClick}>Clique aqui</button>
        <ul>
          {clickArray.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    );
  }
}
