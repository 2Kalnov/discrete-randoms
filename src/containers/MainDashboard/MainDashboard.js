import React, {Component} from 'react';
import UserDistribution from '../../components/UserDistribution/UserDistribution';

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
      <span key="userDistribution" className={this.state.randomDistribution === 'userDistribution' ? 'active' : ''}>Задаваемый ряд распределения</span>,
      <span key="geometricDistribution" className={this.state.randomDistribution === 'geometricDistribution' ? 'active' : ''}>Геометрическое распределение</span>
    ];

    return (
      <div className="layout">
        <h1 className="page-header">Изучение распределений дискретных случайных величин</h1>
        <div className="distributionTabs">
          {distributionTypeTabs}
          {distributionDashboard}
        </div>
      </div>
    );
  }
}

export default MainDashboard;