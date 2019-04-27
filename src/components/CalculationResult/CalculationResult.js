import React from 'react';
import { formatDecimals } from '../../math/helpers';
import populationMeanFormula from '../../assets/images/populationMeanFormula.png';
import varianceFormula from '../../assets/images/varianceFormula.png';
import averageVarianceFormula from '../../assets/images/averageVarianceFormula.png';
import styles from './CalculationResult.css';

const calculationResult = (props) => {
  return (
    <div className='numericParameters'>
      <p>Математическое ожидание: <span className="calcValue">{formatDecimals(props.mean)}</span></p>
      <span>Расчётная формула: </span><img className="formula-image" src={populationMeanFormula} alt="Расчётная формула"/>

      <p>Дисперсия: <span className="calcValue">{formatDecimals(props.variance)}</span></p>
      <span>Расчётная формула: </span><img className="formula-image" src={varianceFormula} alt="Расчётная формула"/>

      <p>Среднее квадратическое отклонение: <span className="calcValue">{formatDecimals(props.averageVariance)}</span></p>
      <span>Расчётная формула: </span><img className="formula-image" src={averageVarianceFormula} alt="Расчётная формула"/>

      <p>Мода: <span className="calcValue">{formatDecimals(props.mode)}</span></p>
    </div>
  );
}

export default calculationResult;