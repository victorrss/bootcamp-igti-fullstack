import React, { Component } from 'react'

export class DecrementButton extends Component {
    handleButtonClick = () => this.props.onDecrement('-')

    render() {
        return (
            <button
                onClick={this.handleButtonClick}
                className="waves-effect waves-light btn red darken-4">
                -
            </button>
        )
    }
}

export class IncrementButton extends Component {
    handleButtonClick = () => this.props.onIncrement('+')

    render() {
        return (
            <button
                onClick={this.handleButtonClick}
                className="waves-effect waves-light btn green darken-4">
                +
            </button>
        )
    }
}
