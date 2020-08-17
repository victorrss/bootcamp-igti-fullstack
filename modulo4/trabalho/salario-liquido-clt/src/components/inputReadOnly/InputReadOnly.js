import React, { Component } from 'react'

export default class InputReadOnly extends Component {
    render() {
        const { label, value } = this.props
        return (
            <>
                <label className="active">{label}</label>
                <input type="text" value={value} readOnly />
            </>
        )
    }
}
