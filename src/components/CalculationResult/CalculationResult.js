import React from 'react';
import styles from './CalculationResult.css';

const calculationResult = (props) => {
  return (
    <div className='numericParameters'>
      <p>Математическое ожидание: {props.mean}</p>
      <p>Дисперсия: {props.variance}</p>
      <p>Среднее квадратическое отклонение: {props.averageVariance}</p>
      <p>Мода: {props.mode}</p>
    </div>
  );
}

export default calculationResult;