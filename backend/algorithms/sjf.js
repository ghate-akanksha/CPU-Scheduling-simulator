function sjf(processes) {
  let n = processes.length;
  let currentTime = 0;
  let completed = 0;

  let isCompleted = new Array(n).fill(false);

  let result = [];
  let ganttChart = [];

  while (completed < n) {
    let idx = -1;
    let minBurst = Infinity;

    // find shortest job among arrived processes
    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i]
      ) {
        if (
          processes[i].burstTime < minBurst ||
          (
            processes[i].burstTime === minBurst &&
            processes[i].arrivalTime <
              processes[idx]?.arrivalTime
          )
        ) {
          minBurst = processes[i].burstTime;
          idx = i;
        }
      }
    }

    // CPU IDLE → jump to next arrival (FIXED)
    if (idx === -1) {
      let nextArrival = Infinity;

      for (let i = 0; i < n; i++) {
        if (!isCompleted[i]) {
          nextArrival = Math.min(
            nextArrival,
            processes[i].arrivalTime
          );
        }
      }

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: nextArrival
      });

      currentTime = nextArrival;
      continue;
    }

    let process = processes[idx];

    let startTime = currentTime;
    let completionTime = startTime + process.burstTime;

    let turnaroundTime =
      completionTime - process.arrivalTime;

    let waitingTime =
      turnaroundTime - process.burstTime;

    result.push({
      pid: process.pid,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    });

    ganttChart.push({
      pid: process.pid,
      startTime,
      endTime: completionTime
    });

    currentTime = completionTime;
    isCompleted[idx] = true;
    completed++;
  }

  return {
    result,
    ganttChart
  };
}

module.exports = sjf;