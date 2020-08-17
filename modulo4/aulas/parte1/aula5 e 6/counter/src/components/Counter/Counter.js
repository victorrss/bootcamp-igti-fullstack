import React, { Component } from 'react'
import css from './counter.module.css'
import { DecrementButton, IncrementButton } from './Buttons'
import Value from './Value'
import Steps from './Steps'

export default class Counter extends Component {
    // estado isolado
    constructor() {
        super()
        this.state = {
            currentCounter: 2,
            steps: 0
        }
    }

    handleButtonClick = (type) => {
        const { currentCounter, steps } = this.state
        this.setState({
            currentCounter: type === '+' ? currentCounter + 1 : currentCounter - 1,
            steps: steps + 1
        })
    }

    render() {
        const { currentCounter, steps } = this.state
        return (
            <div className={css.counterContainer}>
                <DecrementButton onDecrement={this.handleButtonClick} />
                <Value value={currentCounter} />
                <IncrementButton onIncrement={this.handleButtonClick} />
                <Steps value={steps} />
            </div >
        )
    }
}
