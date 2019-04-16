import React from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const errorMessageList = (props) => {
  return (
      props.errorList.length != 0 &&
      props.errorList.map((message, index) => <ErrorMessage key={`error${index}`} message={message}/>)
  );
}

export default errorMessageList;