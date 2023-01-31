const decayRate = (N0: number, N1: number, t1: number, t0: number) => {
  // Should return a positive number.
  return Math.log(N0 / N1) / (t1 - t0);
};

export const logScalePrice = (startTime: number, endTime: number, price: number): number => {
  /**
   *  N(t) = N0 * e^(-λ*(t-t0))
   *
   *  Where:
   *  N(t) = price at current time
   *  N0 = initial price
   *  N1 = end price
   *  t = current time
   *  t0 = start time
   *  t1 = end time
   *  λ = ln(N0/N1) / (t1 - t0)
   *  ln = natural log, (Math.log)
   */
  const currentTime = Date.now();
  const endPrice = 0.5;
  /**
   *  If you have a decreased value, i.e., you have current time as 1675079435056
   *  You should NOT round the value as this will input the same values to the lambda after X period
   *  basically preventing the need to actually call the function every 225 MS (from useEffect)
   *  leading to wasted calls etc.
   *
   *  A decrease in epoch times is NOT needed because
   *  the smaller the epoch values, the smaller the lambda and the smaller the timeelapsed is
   *  they are multipled together and therefore, doesn't matter how small the epoch times are,
   *  the result will always be the same.
   *  It is safe to plug in the default epoch values into the lambda etc.
   *
   *  Lambda = decay constant.
   *  The smaller the decay constant, the slower the decay rate,
   *  and the larger the decay constant, the faster the decay rate.
   */
  const lambda = decayRate(price, endPrice, endTime, startTime); // λ
  const timeElapsed = currentTime - startTime; // t-t0
  // the Math.exp should have an input between -7 and 0.
  const p = -lambda * timeElapsed; // -λ*(t-t0)
  const value = price * Math.exp(p);
  return Number(value.toFixed(2));
};
