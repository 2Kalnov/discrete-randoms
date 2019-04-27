import React, { Component } from 'react';
import DistributionRangeTable from '../DistributionRangeTable/DistributionRangeTable';
import ControlledInput from '../ControlledInput/ControlledInput';
import CalculationResult from '../CalculationResult/CalculationResult';
import ErrorMessageList from '../ErrorMessageList/ErrorMessageList';
import PolygonPlot from '../Plot/PolygonPlot/PolygonPlot';
import FunctionPlot from '../Plot/FunctionPlot/FunctionPlot';
import { PopulationMean, Variance, AverageVariance, Mode } from '../../math/calculations';
import { ProbabilitiesSumIsOne, isProbabilitiesListCorrect, isFloatListCorrect, sliceMap } from '../../math/helpers';
import styles from './UserDistribution.css';

class UserDistribution extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valuesNumber: '',
      xList: new Map(),
      pList: new Map(),
      populationMean: '',
      variance: '',
      averageVariance: '',
      mode: '',
      error: true,
      errorList: []
    }
  }

  handleXValues = (e) => {
    const xIndex = Number.parseInt(e.target.name.slice(1));
    const xValue = e.target.value.replace(',', '.');
    this.setState(state => {
      let x = this.state.xList;
      x.set(xIndex, xValue);
      return {xList: x};
    });
  }

  handlePValues = (e) => {
    const pIndex = Number.parseInt(e.target.name.slice(1));
    const pValue = e.target.value.replace(',', '.');
    this.setState(state => {
      let p = this.state.pList;
      p.set(pIndex, pValue);
      return {pList: p}
    });
  }

  handleValuesNumber = (e) => {
    let valuesNumber = Number.parseInt(e.target.value);
    if(Number.isNaN(valuesNumber))
      valuesNumber = '';

    this.setState((state) => (
      {
        valuesNumber: valuesNumber, 
        xList: sliceMap(state.xList, 0, valuesNumber), 
        pList: sliceMap(state.pList, 0, valuesNumber)
      }
    ));
  }

  calculateAndPlot = (e) => {
    e.preventDefault();
    const xList = Array.from(this.state.xList.values(), x => Number.parseFloat(x)),
          pList = Array.from(this.state.pList.values(), p => Number.parseFloat(p)); 

    let populationMean = '', variance = '', averageVariance = '', mode = '';

    
    let error = false;
    let errorList = [];

    let isProbabilitiesCorrect = isProbabilitiesListCorrect(Array.from(this.state.pList.values()));

    if(xList.length != pList.length)
      errorList.push("Количество значений случайной величины не совпадает с количеством вероятностей");
    if(!isProbabilitiesCorrect)
      errorList.push("Вероятность значения случайной величины должна быть числом в пределах [0; 1]");
    if(isProbabilitiesCorrect && !ProbabilitiesSumIsOne(pList))
      errorList.push("Сумма вероятностей в ряде распределения должна быть равна 1");
    if(!isFloatListCorrect(Array.from(this.state.xList.values())))
      errorList.push("Значения случайной величины должны любыми целыми или десятичными числами");

    error = errorList.length != 0;

    if(!error) {
      let distributionRange = new Map();
      xList.forEach((x, index) => distributionRange.set(x, pList[index]));

      populationMean = PopulationMean(distributionRange);
      variance = Variance(distributionRange);
      averageVariance = AverageVariance(distributionRange);
      mode = Mode(distributionRange);
    }

    this.setState({error: error, errorList: errorList, populationMean: populationMean, variance: variance, averageVariance: averageVariance, mode: mode});
  }

  render() {
    return (
      <div className="distributionDashboardContainer">
        <form onSubmit={this.calculateAndPlot} className="calculationForm">
          <ControlledInput labelText="Количество значений ДСВ: " value={this.state.valuesNumber} handler={this.handleValuesNumber}/>
          <DistributionRangeTable 
            valuesNumber={this.state.valuesNumber} 
            xList={this.state.xList}
            xListHandler={this.handleXValues} 
            pList={this.state.pList}
            pListHandler={this.handlePValues}
          />
          { this.state.error ?
            <ErrorMessageList errorList={this.state.errorList}/>
            :
            <CalculationResult 
              mean={this.state.populationMean}
              variance={this.state.variance}
              averageVariance={this.state.averageVariance}
              mode={this.state.mode}
            />
          }
          <input type="submit" className="controlButton" value="Вычислить характеристики"/>
        </form>
        
        {
          !this.state.error &&
          <PolygonPlot 
            xList={Array.from(this.state.xList.values(), x => Number.parseFloat(x))} 
            pList={Array.from(this.state.pList.values(), p => Number.parseFloat(p))}
            domElement="polygon"  
          /> 
        }
        
        {
          !this.state.error &&
          <FunctionPlot 
            xList={Array.from(this.state.xList.values(), x => Number.parseFloat(x))} 
            pList={Array.from(this.state.pList.values(), p => Number.parseFloat(p))}
            domElement="distribution"  
          /> 
        }
      </div>
    );
  }
}

export default UserDistribution;