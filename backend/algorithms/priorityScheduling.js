function priorityScheduling(processes) {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;

  const isCompleted = new Array(n).fill(false);
  const result = [];
  const ganttChart = [];

  while (completed < n) {
    let idx = -1;

    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i]
      ) {
        if (idx === -1) {
          idx = i;
        } else {
          const a = processes[i];
          const b = processes[idx];

          const p1 = Number(a.priority);
          const p2 = Number(b.priority);

          // LOWER NUMBER = HIGHER PRIORITY
          if (p1 < p2) {
            idx = i;
          } 
          else if (p1 === p2) {
            if (a.arrivalTime < b.arrivalTime) {
              idx = i;
            } 
            else if (
              a.arrivalTime === b.arrivalTime &&
              i < idx
            ) {
              idx = i;
            }
          }
        }
      }
    }

    // CPU IDLE
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

    const process = processes[idx];

    const startTime = currentTime;
    const completionTime = startTime + process.burstTime;

    result.push({
      pid: process.pid,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      priority: process.priority,
      startTime,
      completionTime,
      turnaroundTime: completionTime - process.arrivalTime,
      waitingTime:
        completionTime -
        process.arrivalTime -
        process.burstTime
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

  return { result, ganttChart };
}

module.exports = priorityScheduling;