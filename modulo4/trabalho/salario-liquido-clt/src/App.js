import React, { Component } from 'react';
import InputFullSalary from './components/inputFullSalary/InputFullSalary';
import InputReadOnly from './components/inputReadOnly/InputReadOnly';
import ProgressBarSalary from './components/progressBarSalary/ProgressBarSalary';
import { calculateSalaryFrom } from './helpers/salary';
import { formatNumber, formatPercent } from './helpers/formatHelpers';

export default class App extends Component {
  constructor() {
    super()

    this.state = {
      fullSalary: 3900,
    }
  }

  handleInputFullSalary = (newValue) => {
    this.setState({ fullSalary: newValue })
  }

  getPercentualFormatted(value) {
    const { fullSalary } = this.state
    const percent = value / fullSalary
    const result = percent > 0 ? '(' + formatPercent((percent)) + ')' : ''

    return result
  }

  getPercentual(value) {
    const { fullSalary } = this.state
    const percent = value / fullSalary
    const result = (percent * 100).toFixed(2)
    return result
  }

  render() {
    const { calculation, fullSalary } = this.state
    return (
      <div className="container">
        <h1 style={style.centeredTitle}>React Salário</h1>

        <div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <InputFullSalary label="Salário bruto" onChangeInputFullSalary={this.handleInputFullSalary} value={fullSalary} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s3">
                <InputReadOnly label="Base INSS" value={formatNumber(calculateSalaryFrom(fullSalary).baseINSS)} />
              </div>
              <div className="input-field col s3">
                <InputReadOnly label="Desconto INSS" value={`${formatNumber(calculateSalaryFrom(fullSalary).discountINSS)} ${this.getPercentualFormatted(calculateSalaryFrom(fullSalary).discountINSS)}`} />
              </div>
              <div className="input-field col s3">
                <InputReadOnly label="Base IRPF" value={formatNumber(calculateSalaryFrom(fullSalary).baseIRPF)} />
              </div>
              <div className="input-field col s3">
                <InputReadOnly label="Desconto IRPF" value={`${formatNumber(calculateSalaryFrom(fullSalary).discountIRPF)} ${this.getPercentualFormatted(calculateSalaryFrom(fullSalary).discountIRPF)}`} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="col s12">
            <div className="row">
              <div className="input-field col s3">
                <InputReadOnly label="Salário líquido" value={`${formatNumber(calculateSalaryFrom(fullSalary).netSalary)} ${this.getPercentualFormatted(calculateSalaryFrom(fullSalary).netSalary)}`} />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ProgressBarSalary value={this.getPercentual(calculateSalaryFrom(fullSalary).discountINSS)} color="#e67e22" />
          <ProgressBarSalary value={this.getPercentual(calculateSalaryFrom(fullSalary).discountIRPF)} color="#c0392b" />
          <ProgressBarSalary value={this.getPercentual(calculateSalaryFrom(fullSalary).netSalary)} color="#16a085" />
        </div>
      </div>
    );
  }
}
const style = {
  centeredTitle: {
    textAlign: 'center'
  }
}