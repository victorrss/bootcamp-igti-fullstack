import React, { Component } from 'react'
import css from './counter.module.css'
import { DecrementButton, IncrementButton } from './Buttons'
import Value from './Value'
import Steps from './Steps'

export default class Counter2 extends Component {
    // estado compartilhado em app
    handleButtonClick = (type) => {
        this.props.onCount(type)
    }

    render() {
        const { countValue, currentStep } = this.props
        return (
            <div className={css.counterContainer}>
                <DecrementButton onDecrement={this.handleButtonClick} />
                <Value value={countValue} />
                <IncrementButton onIncrement={this.handleButtonClick} />
                <Steps value={currentStep} />
            </div >
        )
    }
}
