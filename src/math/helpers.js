import * as math from 'mathjs';
math.config({number: 'number', precision: 100});

const checkProbabilityListSum = (pList) => {
  let pNumberList = pList.map(p => math.number(p));
  let pSum = pNumberList.reduce((sum, p) => sum + p, math.number(0));

  return math.equal(pSum, math.number(1));
}

const isProbabilityValueCorrect = (pValue) => {
  let floatValue = Number.parseFloat(pValue);
  return !Number.isNaN(floatValue) && math.largerEq(math.number(floatValue), 0) && math.smallerEq(math.number(floatValue), 1);
}

const isProbabilitiesListCorrect = (pList) => {
  let isCorrect = true;
  pList.forEach(p => {
    if(!isProbabilityValueCorrect(p))
      isCorrect = false;
  });

  return isCorrect;
}

const isFloatListCorrect = (list) => {
  let isCorrect = true;
  list.forEach(x => {
    if(Number.isNaN(Number.parseFloat(x)))
      isCorrect = false;
  });

  return isCorrect;
}

const formatDecimals = (number) => {
  let numberString = number.toString();
  let result;
  const onlyZerosAfterDotPattern = /[\.,]0+$/;
  const extraZerosPattern = /0+$/;

  if(numberString.match(onlyZerosAfterDotPattern) === null)
    result = numberString.replace(extraZerosPattern, '');
  else
    result = numberString.replace(onlyZerosAfterDotPattern, '');

  return result;
}

const sliceMap = (map, startIndex, endIndex) => {
  let iteratorPosition = 0,
      mapIterator = map.entries(),
      slicedMap = new Map();

  for(; iteratorPosition < startIndex; iteratorPosition += 1)
    mapIterator.next();

  let iteratingDone = false;
  for(; iteratorPosition < endIndex && !iteratingDone; iteratorPosition += 1)
  {
    let mapPair = mapIterator.next();
    iteratingDone = mapPair.done;
    if(!iteratingDone)
      slicedMap.set(mapPair.value[0], mapPair.value[1]);
  }
  return slicedMap;
}

export { checkProbabilityListSum as ProbabilitiesSumIsOne };
export { isProbabilitiesListCorrect };
export { isFloatListCorrect };
export { isProbabilityValueCorrect };
export { formatDecimals };
export { sliceMap };