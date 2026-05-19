// SJF (Non-Preemptive) Scheduling Algorithm

function sjf(processes) {

  let currentTime = 0;
  let completed = 0;
  let n = processes.length;

  let isCompleted = new Array(n).fill(false);

  let result = [];
  let ganttChart = [];

  while (completed !== n) {

    let idx = -1;
    let minBurst = Infinity;

    // Find shortest job among arrived processes
    for (let i = 0; i < n; i++) {

      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i]
      ) {

        if (processes[i].burstTime < minBurst) {
          minBurst = processes[i].burstTime;
          idx = i;
        }
      }
    }

    // CPU IDLE CASE
    if (idx === -1) {

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: currentTime + 1
      });

      currentTime++;
      continue;
    }

    // Process execution
    let process = processes[idx];

    let pid = process.pid || `P${idx + 1}`;

    let startTime = currentTime;
    let completionTime = startTime + process.burstTime;

    let turnaroundTime = completionTime - process.arrivalTime;
    let waitingTime = turnaroundTime - process.burstTime;

    // Store result
    result.push({
      pid,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime
    });

    // Store Gantt Chart (IMPORTANT FIX)
    ganttChart.push({
      pid,
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