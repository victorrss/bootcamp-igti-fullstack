import React, { Component } from 'react'

export default class InputFullSalary extends Component {
    handleChangeInput = (e) => {
        const { onChangeInputFullSalary } = this.props
        onChangeInputFullSalary(e.target.value)
    }
    render() {
        const { label, value } = this.props
        return (
            <>
                <label className="active">{label}</label>
                <input type="number" value={value} onChange={this.handleChangeInput} />
            </>
        )
    }
}
