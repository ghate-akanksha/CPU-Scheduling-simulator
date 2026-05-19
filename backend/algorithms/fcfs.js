function fcfs(processes) {

  let currentTime = 0;
  let result = [];
  let ganttChart = [];

  // Sort by arrival time (important for FCFS)
  let sortedProcesses = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );

  for (let i = 0; i < sortedProcesses.length; i++) {

    let process = sortedProcesses[i];

    let pid = process.pid || `P${i + 1}`;

    // CPU IDLE TIME HANDLING
    if (currentTime < process.arrivalTime) {

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: process.arrivalTime
      });

      currentTime = process.arrivalTime;
    }

    let startTime = currentTime;
    let completionTime = startTime + process.burstTime;

    let turnaroundTime = completionTime - process.arrivalTime;
    let waitingTime = turnaroundTime - process.burstTime;

    result.push({
      pid,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    });

    ganttChart.push({
      pid,
      startTime,
      endTime: completionTime
    });

    currentTime = completionTime;
  }

  return {
    result,
    ganttChart
  };
}

module.exports = fcfs;