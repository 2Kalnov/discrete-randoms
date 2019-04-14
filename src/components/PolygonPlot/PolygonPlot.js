import React, { Component } from 'react';
import { DistributionPolygon } from '../../math/distributionPlots';

class PolygonPlot extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if(this.props.xList.length != 0 && this.props.pList.length != 0 && this.props.xList.length == this.props.pList.length)
      DistributionPolygon(this.props.xList, this.props.pList, this.props.domElement);
  }

  componentDidUpdate() {
    if(this.props.xList.length != 0 && this.props.pList.length != 0 && this.props.xList.length == this.props.pList.length)
      DistributionPolygon(this.props.xList, this.props.pList, this.props.domElement);
  }

  render() {
    return (
      <React.Fragment>
        <h2>Многоугольник распределения</h2>
        <div id={this.props.domElement}></div>
      </React.Fragment>
    );
  }
}

export default PolygonPlot;