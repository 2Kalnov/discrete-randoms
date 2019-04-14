import React, { Component } from 'react';
import DistributionRangeTable from '../DistributionRangeTable/DistributionRangeTable';
import ControlledInput from '../ControlledInput/ControlledInput';
import CalculationResult from '../CalculationResult/CalculationResult';
import PolygonPlot from '../PolygonPlot/PolygonPlot';
import FunctionPlot from '../FunctionPlot/FunctionPlot';
import { PopulationMean, Variance, AverageVariance } from '../../math/calculations';
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
      error: true,
      errorList: []
    }
  }

  handleXValues = (e) => {
    const xIndex = Number.parseInt(e.target.name.slice(1));
    const xValue = Number.parseFloat(e.target.value);
    this.setState(state => {
      let x = this.state.xList;
      x.set(xIndex, xValue);
      return {xList: x};
    });
  }

  handlePValues = (e) => {
    const pIndex = Number.parseInt(e.target.name.slice(1));
    const pValue = Number.parseFloat(e.target.value);
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
    this.setState({valuesNumber: valuesNumber});
  }

  calculateAndPlot = (e) => {
    e.preventDefault();
    const xList = Array.from(this.state.xList.values(), x => Number.parseFloat(x)),
          pList = Array.from(this.state.pList.values(), p => Number.parseFloat(p)); 

    let populationMean = '', variance = '', averageVariance = '';
    
    let error = false;
    let errorList = [];

    if(xList.length != pList.length)
      errorList.push("Количество значений случайной величины не совпадает с количеством вероятностей");

    error = errorList.length != 0;

    if(!error) {
      let distributionRange = new Map();
      xList.forEach((x, index) => distributionRange.set(x, pList[index]));

      populationMean = PopulationMean(distributionRange);
      variance = Variance(distributionRange);
      averageVariance = AverageVariance(distributionRange);
    }

    this.setState({error: error, errorList: errorList, populationMean: populationMean, variance: variance, averageVariance: averageVariance});
  }

  render() {
    return (
      <React.Fragment>
        <DistributionRangeTable 
          valuesNumber={this.state.valuesNumber} 
          xList={this.state.xList}
          xListHandler={this.handleXValues} 
          pList={this.state.pList}
          pListHandler={this.handlePValues}/>
        <form onSubmit={this.calculateAndPlot}>
          <ControlledInput labelText="Количество значений ДСВ" value={this.state.valuesNumber} handler={this.handleValuesNumber}/>
          <input type="submit" value="Вычислить характеристики"/>
        </form>
        <CalculationResult 
          mean={this.state.populationMean}
          variance={this.state.variance}
          averageVariance={this.state.averageVariance}
        />
        <PolygonPlot 
          xList={Array.from(this.state.xList.values(), x => Number.parseFloat(x))} 
          pList={Array.from(this.state.pList.values(), p => Number.parseFloat(p))}
          domElement="polygon"  
        />
        <FunctionPlot 
          xList={Array.from(this.state.xList.values(), x => Number.parseFloat(x))} 
          pList={Array.from(this.state.pList.values(), p => Number.parseFloat(p))}
          domElement="distribution"  
        />

      </React.Fragment>
    );
  }
}

export default UserDistribution;