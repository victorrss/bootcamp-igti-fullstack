import React, { Component } from 'react';
import Users from './components/Users/Users';
import Toggle from './components/Toggle/Toggle';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
      showUsers: false
    }
  }

  async componentDidMount() {
    console.log('componentDidMount de App.js')
    const res = await fetch('https://randomuser.me/api/?seed=rush&nat=br&results=10')
    const json = await res.json()

    this.setState({ users: json.results })
  }

  componentDidUpdate() {
    console.log('componentDidUpdate de App.js')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount de App.js')
  }

  handleShowUsers = (isChecked) => {
    this.setState({ showUsers: isChecked })
  }

  render() {
    const { showUsers, users } = this.state
    return (
      <div>
        <Toggle enabled={showUsers} onToggle={this.handleShowUsers} />
        <hr />
        {showUsers && <Users users={users} />}
      </div>
    )
  }
}
