import * as math from 'mathjs';
math.config({number: 'number', precision: 100});

const outputFormatSettings = {notation: 'fixed', precision: 3};

const calculatePopulationMean = (distributionRange) => {
  let result = math.number(0);

  distributionRange.forEach((p, x) => {
    const singleProduct = math.multiply(math.bignumber(x), math.bignumber(p));
    result = math.add(result, singleProduct);
  });

  return result;
}

const calculatePopulationMeanFormatted = (distributionRange) => {
  let populationMean = calculatePopulationMean(distributionRange);
  return math.format(populationMean, outputFormatSettings);
}

const calculateVariance = (distributionRange) => {
  const populationMean = calculatePopulationMean(distributionRange);
  const populationMeanSquare = math.pow(populationMean, 2);
  const squareXPopulationMean = calculatePopulationMean(squareRandomValue(distributionRange));

  return math.subtract(squareXPopulationMean, populationMeanSquare);
}

const calculateVarianceFormatted = (distributionRange) => {
  let variance = calculateVariance(distributionRange);
  return math.format(variance, outputFormatSettings);
}

const isPresentedInRange = (distributionRange, xToFound) => {
  let isPresented = false;
  let givenBigX = math.bignumber(xToFound);
  distributionRange.forEach((p, x) => {
    let bigX = math.bignumber(x);
    if(math.equal(bigX, givenBigX))
      isPresented = true;
  });

  return isPresented;
}

const squareRandomValue = (distributionRange) => {
  const squareXList = new Map();

  distributionRange.forEach((p, x) => {
    let squareValue = math.pow(math.bignumber(x), 2);
    squareXList.set(math.number(squareValue), p);
  });

  let uniqueXList = new Map();

  squareXList.forEach((p, x) => {
    if(uniqueXList.get(x) === undefined)
      uniqueXList.set(x, p);
    else {
      let currentP = uniqueXList.get(x);
      uniqueXList.set(x, p + currentP);
    }
  });
  
  return uniqueXList;
}

const calculateAverageVariance = (distributionRange) => {
  const variance = calculateVariance(distributionRange);
  return math.sqrt(variance);
}

const calculateAverageVarianceFormatted = (distributionRange) => {
  let averageVariance = calculateAverageVariance(distributionRange);
  return math.format(averageVariance, outputFormatSettings);
}

export { calculatePopulationMeanFormatted as PopulationMean };
export { calculateVarianceFormatted as Variance};
export { calculateAverageVarianceFormatted as AverageVariance };