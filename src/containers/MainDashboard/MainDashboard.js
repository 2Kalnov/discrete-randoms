import React, {Component} from 'react';
import UserDistribution from '../../components/UserDistribution/UserDistribution';
import PseudoGeometricDistribution from '../../components/PseudoGeometricDistribution/PseudoGeometricDistribution';
import styles from './MainDashboard.css';

class MainDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDistribution: 'user'
    }
  }

  handleDistributionRangeChoice = (range) => {
    this.setState({randomDistribution: range});
  }

  render() {
    let distributionDashboard;
    switch(this.state.randomDistribution) {
      case 'user':
        distributionDashboard = <UserDistribution/>;
        break;
      case 'pseudoGeometric':
        distributionDashboard = <PseudoGeometricDistribution/>;
        break;
      default:
        distributionDashboard = <UserDistribution/>;
    }

    const distributionTypeTabs = [
      <span 
        key="user" 
        className={this.state.randomDistribution === 'user' ? 'active' : ''}
        onClick={() => this.handleDistributionRangeChoice('user')}
      >Задаваемый ряд распределения</span>,
      <span 
        key="pseudoGeometric" 
        className={this.state.randomDistribution === 'pseudoGeometric' ? 'active' : ''}
        onClick={() => this.handleDistributionRangeChoice('pseudoGeometric')}
      >Псевдогеометрическое распределение</span>
    ];

    return (
      <div className="layout">
        <h1 className="page-header" style={{textAlign: 'center'}}>Изучение распределений дискретных случайных величин</h1>
        <div className="distributionTabs flexbox">
          {distributionTypeTabs}
        </div>
        {distributionDashboard}
      </div>
    );
  }
}

export default MainDashboard;