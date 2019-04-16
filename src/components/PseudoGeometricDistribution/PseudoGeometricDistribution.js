import React, { Component } from 'react';
import DistributionRangeTable from '../DistributionRangeTable/DistributionRangeTable';
import ControlledInput from '../ControlledInput/ControlledInput';
import CalculationResult from '../CalculationResult/CalculationResult';
import ErrorMessageList from '../ErrorMessageList/ErrorMessageList';
import PolygonPlot from '../Plot/PolygonPlot/PolygonPlot';
import FunctionPlot from '../Plot/FunctionPlot/FunctionPlot';
import { PopulationMean, Variance, AverageVariance, Mode, GeometricProbabilties, GeometricValues } from '../../math/calculations';
import { isProbabilityValueCorrect } from '../../math/helpers';
import styles from './PseudoGeometricDistribution.css';

class PseudoGeometricDistribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p: '',
      n: '',
      xList: [],
      pList: [],
      populationMean: '',
      variance: '',
      averageVariance: '',
      mode: '',
      error: true,
      showDistributionRange: false,
      errorList: []
    };
  }

  handlePChange = (e) => {
    const pValue = e.target.value.replace(',', '.');
    this.setState({p: pValue, showDistributionRange: false, xList: [], pList: []});
  }

  handleNChange = (e) => {
    const nValue = e.target.value.replace(',', '.');
    this.setState({n: nValue, showDistributionRange: false, xList: [], pList: []});
  }

  calculateAndPlot = (e) => {
    e.preventDefault();
    const n = Number.parseFloat(this.state.n);
    const p = Number.parseFloat(this.state.p);
    let xList,
        pList;

    let populationMean = '', variance = '', averageVariance = '', mode = '';

    let error = false;
    let errorList = [];
    let parametersExist = this.state.n.length != 0 && this.state.p.length != 0;

    let isProbabilityCorrect = isProbabilityValueCorrect(p);

    if(!parametersExist)
      errorList.push("Введите параметры распределения");
    if(n < 1 && parametersExist)
      errorList.push("Максимальное количество испытаний должно быть не меньше 1");
    if(!isProbabilityCorrect && parametersExist)
      errorList.push("Вероятность события должна быть числом в пределах [0; 1]");

    error = errorList.length != 0;
    if(!error) {
      xList = GeometricValues(Number.parseFloat(this.state.n));
      pList = GeometricProbabilties(Number.parseFloat(this.state.p), Number.parseFloat(this.state.n));

      let distributionRange = new Map();
      xList.forEach((x, index) => distributionRange.set(x, pList[index]));

      populationMean = PopulationMean(distributionRange);
      variance = Variance(distributionRange);
      averageVariance = AverageVariance(distributionRange);
      mode = Mode(distributionRange);
    }
    
    this.setState({error: error, errorList: errorList, populationMean: populationMean, variance: variance, averageVariance: averageVariance, mode: mode, showDistributionRange: !error, xList: xList, pList: pList});
  }

  render() {
    return (
      <div className="distributionDashboardContainer">
        <h3>Параметры распределения</h3>
        <form onSubmit={this.calculateAndPlot} className="distributionParameters">
          <ControlledInput
            labelText="Вероятность наступления события: "
            value={this.state.p}
            handler={this.handlePChange}
          />
          <ControlledInput
            labelText="Максимальное количество испытаний: "
            value={this.state.n}
            handler={this.handleNChange}
          />
          <input type="submit" className="controlButton" value="Показать распределение"/>
        </form>
        {
          this.state.showDistributionRange &&
          (<div className="distributionInfo">
            <h3>Ряд распределения и числовые характеристики СВ:</h3>
            <DistributionRangeTable
              valuesNumber={this.state.n}
              xList={new Map(this.state.xList.map((x, index) => [(index).toString(), x]))}
              pList={new Map(this.state.pList.map((p, index) => [(index).toString(), p]))}
              cellsOptions={{disabled: true}}
            />
            <CalculationResult
              mean={this.state.populationMean}
              variance={this.state.variance}
              averageVariance={this.state.averageVariance}
              mode={this.state.mode}
            />
            <PolygonPlot
              xList={this.state.xList}
              pList={this.state.pList}
              domElement="geometricPolygon"
            />
          </div>) 
        }
        <ErrorMessageList errorList={this.state.errorList}/>
      </div>
    );
  }
}

export default PseudoGeometricDistribution;