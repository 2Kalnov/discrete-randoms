import React, { Component } from 'react';
import { DistributionFunction } from '../../../math/distributionPlots';
import styles from '../Plot.css';

class FunctionPlot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.xList.length != 0 && this.props.pList.length != 0 && this.props.xList.length == this.props.pList.length)
      DistributionFunction(this.props.xList, this.props.pList, this.props.domElement);
  }

  componentDidUpdate() {
    if(this.props.xList.length != 0 && this.props.pList.length != 0 && this.props.xList.length == this.props.pList.length)
      DistributionFunction(this.props.xList, this.props.pList, this.props.domElement);
  }

  render() {
    return (
      <React.Fragment>
        <h2 className="plotName">График функции распределения</h2>
        <div id={this.props.domElement}></div>
      </React.Fragment>
    );
  }
}

export default FunctionPlot;