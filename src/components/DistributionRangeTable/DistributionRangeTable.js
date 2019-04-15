import React from 'react';
import ControlledInput from '../ControlledInput/ControlledInput';
import styles from './DistributionRangeTable.css';

const distributionRangeTable = (props) => {
  let valuesNumber;
  valuesNumber = Number.parseInt(props.valuesNumber);
  if(Number.isNaN(valuesNumber) || valuesNumber === undefined)
    valuesNumber = 0;
  let xListCells = new Array(valuesNumber).fill(undefined),
      pListCells = new Array(valuesNumber).fill(undefined);

  xListCells = xListCells.map((_, index) => {
    let key = `x${index}`;
    return <td key={key}><ControlledInput 
                inputName={key} 
                labelText=''
                value={props.xList.get(index.toString())}
                handler={props.xListHandler}
              /></td>
  });

  pListCells = pListCells.map((_, index) => {
    let key = `x${index}`;
    return <td key={key}><ControlledInput 
                inputName={key} 
                labelText=''
                value={props.pList.get(index.toString())}
                handler={props.pListHandler}
              /></td>
  });

  return (
    <div className="distributionRangeForm">
      <table className="distributionRange">
        <tbody>
          <tr className="xList">
            <td>x<sub>i</sub></td>
            {xListCells}
          </tr>
          <tr className="pList">
            <td>p<sub>i</sub></td>
            {pListCells}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default distributionRangeTable;