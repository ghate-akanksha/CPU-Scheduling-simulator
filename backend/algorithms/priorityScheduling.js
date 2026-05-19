// Priority Scheduling (Non-Preemptive)

function priorityScheduling(processes) {

  let n = processes.length;
  let currentTime = 0;
  let completed = 0;

  let isCompleted = new Array(n).fill(false);

  let result = [];
  let ganttChart = [];

  while (completed !== n) {

    let idx = -1;
    let highestPriority = Infinity;

    // Find highest priority process (lowest number = highest priority)
    for (let i = 0; i < n; i++) {

      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i]
      ) {

        if (processes[i].priority < highestPriority) {
          highestPriority = processes[i].priority;
          idx = i;
        }
      }
    }

    // CPU IDLE
    if (idx === -1) {
      currentTime++;

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime - 1,
        endTime: currentTime
      });

      continue;
    }

    let process = processes[idx];

    let pid = process.pid || `P${idx + 1}`;

    let startTime = currentTime;
    let completionTime = startTime + process.burstTime;

    let turnaroundTime = completionTime - process.arrivalTime;
    let waitingTime = turnaroundTime - process.burstTime;

    result.push({
      pid,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      priority: process.priority,
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
    isCompleted[idx] = true;
    completed++;
  }

  return {
    result,
    ganttChart
  };
}

module.exports = priorityScheduling;