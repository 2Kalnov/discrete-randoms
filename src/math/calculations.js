import * as math from 'mathjs';
math.config({number: 'number', precision: 100});

const outputFormatSettings = {notation: 'fixed', precision: 7};

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
    squareXList.set(squareValue, math.bignumber(p));
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

const calculateMode = (distributionRange) => {
  let modeIndex, modeProbability;
  const pList = Array.from(distributionRange.values(), p => math.bignumber(Number.parseFloat(p)));
  const xList = Array.from(distributionRange.keys(), x => math.bignumber(Number.parseFloat(x)));

  modeIndex = 0;
  modeProbability = pList[modeIndex];

  pList.slice(1).forEach((p, index) => {
    if(math.larger(p, modeProbability)) {
      modeProbability = p;
      modeIndex = index + 1;
    }
  });

  return math.format(xList[modeIndex], outputFormatSettings);
}

const calculateGeometricProbabilities = (p, testsNumber) => {
  const xList = generateGeomtricDistributionValues(testsNumber);
  const pList = xList.map(x => calculateGeometricProbability(p, x, testsNumber));

  return pList;
}

const generateGeomtricDistributionValues = (testsNumber) => {
  return Array(testsNumber).fill(undefined).map((_, index) => index + 1);
}

const calculateGeometricProbability = (p, testNumber, testsNumber) => {
  const pValue = math.bignumber(p);
  const qValue = math.bignumber(math.subtract(1, pValue));
  const probability = testNumber != testsNumber ? math.multiply(math.pow(qValue, testNumber - 1), pValue) 
    : math.add(math.multiply(math.pow(qValue, testNumber - 1), pValue), math.pow(qValue, testNumber));

  return math.number(probability);
} 

export { calculatePopulationMeanFormatted as PopulationMean };
export { calculateVarianceFormatted as Variance};
export { calculateAverageVarianceFormatted as AverageVariance };
export { calculateMode as Mode };
export { calculateGeometricProbabilities as GeometricProbabilties };
export { generateGeomtricDistributionValues as GeometricValues }; 