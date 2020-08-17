import React, { Component } from 'react'

export default class Toggle extends Component {
    handleShowUsers = (e) => {
        const { onToggle } = this.props
        const isChecked = e.target.checked

        onToggle(isChecked)
    }
    render() {
        const { enabled } = this.props
        return (
            <div className="switch">
                <label>
                    Mostrar Usuários
              <input type="checkbox" checked={enabled} onChange={this.handleShowUsers} />
                    <span className="lever"></span>
                </label>
            </div>
        )
    }
}
