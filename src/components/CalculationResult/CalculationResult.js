import React from 'react';
import { formatDecimals } from '../../math/helpers';
import styles from './CalculationResult.css';

const calculationResult = (props) => {
  return (
    <div className='numericParameters'>
      <p>Математическое ожидание: {formatDecimals(props.mean)}</p>
      <p>Дисперсия: {formatDecimals(props.variance)}</p>
      <p>Среднее квадратическое отклонение: {formatDecimals(props.averageVariance)}</p>
      <p>Мода: {formatDecimals(props.mode)}</p>
    </div>
  );
}

export default calculationResult;