import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ''
    }
    this.allCountries = []
  }

  async componentDidMount() {
    const res = await fetch('http://restcountries.eu/rest/v2/all')
    const json = await res.json()

    this.allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      }
    })

    const totalPopulation = this.calculateTotalPopulationFrom(this.allCountries)

    this.setState({
      filteredCountries: this.allCountries,
      filteredPopulation: totalPopulation
    })
  }

  calculateTotalPopulationFrom = (countries) => {
    return countries.reduce((accumulator, current) => {
      return accumulator + current.population;
    }, 0)
  }

  handleChangeFilter = (newText) => {
    this.setState({ filter: newText })

    const filterLowerCase = newText.toLowerCase()

    const filteredCountries = this.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase)
    })

    const totalPopulation = this.calculateTotalPopulationFrom(filteredCountries)

    this.setState({
      filteredCountries,
      filteredPopulation: totalPopulation
    })
  }

  render() {
    const { filteredCountries, filter, filteredPopulation: totalPopulation } = this.state

    return (
      <div className="container">
        <h2 style={style.centeredTitle}>Countries</h2>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={totalPopulation}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries
          countries={filteredCountries}
        />
      </div>
    );
  }
}

const style = {
  centeredTitle: {
    textAlign: 'center'
  }
}