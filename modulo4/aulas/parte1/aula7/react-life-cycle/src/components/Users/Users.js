import React, { Component, Fragment } from 'react'
import User from './User';

export default class Users extends Component {
    constructor() {
        super()
        this.state = {
            seccondsVisible: 0
        }
        this.interval = null;
    }

    componentDidMount() {
        console.log('componentDidMount de Users.js')
        this.interval = setInterval(() => {
            const { seccondsVisible } = this.state
            this.setState({
                seccondsVisible: seccondsVisible + 1
            })
        }, 1000);
    }

    componentWillUnmount() {
        console.log('componentWillUnmount de Users.js')
        clearInterval(this.interval)
    }
    render() {
        const { users } = this.props
        const { seccondsVisible } = this.state
        return (
            <div>
                <p>Comp. Users visivel por {seccondsVisible} segundos</p>
                {users.map((user) => {
                    return <Fragment key={user.login.uuid}><User user={user} /></Fragment>
                })}
            </div>
        )
    }
}
