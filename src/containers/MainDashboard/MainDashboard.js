import React, {Component} from 'react';
import UserDistribution from '../../components/UserDistribution/UserDistribution';
import styles from './MainDashboard.css';

class MainDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      randomDistribution: 'userDistribution'
    }
  }

  handleDistributionRangeChoice = (range) => {
    this.setState({randomDistribution: range});
  }

  render() {
    let distributionDashboard;
    switch(this.state.randomDistribution) {
      case 'userDistribution':
        distributionDashboard = <UserDistribution/>;
        break;
      default:
        distributionDashboard = <UserDistribution/>;
    }

    const distributionTypeTabs = [
      <span 
        key="userDistribution" 
        className={this.state.randomDistribution === 'userDistribution' ? 'active' : ''}
        onClick={() => this.handleDistributionRangeChoice('userDistribution')}
      >Задаваемый ряд распределения</span>,
      <span 
        key="geometricDistribution" 
        className={this.state.randomDistribution === 'geometricDistribution' ? 'active' : ''}
        onClick={() => this.handleDistributionRangeChoice('geometricDistribution')}
      >Геометрическое распределение</span>
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