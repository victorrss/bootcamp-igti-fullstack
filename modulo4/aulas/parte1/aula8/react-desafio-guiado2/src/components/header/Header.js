import React, { Component } from 'react'
import formatNumber from '../../helpers/formatHelpers'
import css from './header.module.css'
export default class Header extends Component {
    handleInputChange = (e) => {
        const { onChangeFilter } = this.props
        const newText = e.target.value

        onChangeFilter(newText)
    }

    render() {
        const { filter, countryCount, totalPopulation } = this.props
        return (
            <div className={css.flexRow}>
                <input
                    type="text"
                    placeholder="Digite aqui"
                    value={filter}
                    onChange={this.handleInputChange}
                /> |
                <span className={css.countries}>Países: <strong>{countryCount}</strong></span> |
                <span className={css.population}>População: <strong>{formatNumber(totalPopulation)}</strong></span>
            </div>
        )
    }
}
