function calculateAverage(result) {
  let totalWT = 0;
  let totalTAT = 0;

  result.result.forEach((process) => {
    totalWT += process.waitingTime;
    totalTAT += process.turnaroundTime;
  });

  return {
    avgWaitingTime: (
      totalWT / result.result.length
    ).toFixed(2),

    avgTurnaroundTime: (
      totalTAT / result.result.length
    ).toFixed(2),
  };
}

module.exports = calculateAverage;