function fcfs(processes) {
  let currentTime = 0;
  let result = [];
  let ganttChart = [];

  // Sort by arrival time (and PID as tie-breaker)
  let sortedProcesses = [...processes].sort(
    (a, b) =>
      a.arrivalTime - b.arrivalTime ||
      a.pid.localeCompare(b.pid)
  );

  for (let process of sortedProcesses) {
    const { pid, arrivalTime, burstTime } = process;

    // validation
    if (burstTime <= 0) {
      throw new Error(`Invalid burst time for process ${pid}`);
    }

    // CPU idle 
    if (currentTime < arrivalTime) {
      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: arrivalTime
      });

      currentTime = arrivalTime;
    }

    let startTime = currentTime;
    let completionTime = startTime + burstTime;

    let turnaroundTime = completionTime - arrivalTime;
    let waitingTime = turnaroundTime - burstTime;

    result.push({
      pid,
      arrivalTime,
      burstTime,
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