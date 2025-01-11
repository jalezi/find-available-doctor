/* eslint-disable no-restricted-syntax */
function getTrendLine(data) {
  const n = data.length;

  if (n === 0) return [];

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  // Calculate the sums needed for linear regression
  for (const [x, y] of data) {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x ** 2;
  }

  // Calculate the slope of the trend line
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

  // Calculate the intercept of the trend line
  const intercept = (sumY - slope * sumX) / n;

  // Find the minimum and maximum x-values from the scatter plot data
  const xValues = data.map(([x]) => x);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);

  // Calculate the corresponding y-values for the trend line using the slope and intercept
  const trendline = [
    [minX, minX * slope + intercept],
    [maxX, maxX * slope + intercept],
  ];

  return trendline;
}
export default getTrendLine;
