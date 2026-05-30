function srjf(processes) {
  const n = processes.length;

  // avoid mutation
  const proc = [...processes].sort(
    (a, b) =>
      a.arrivalTime - b.arrivalTime ||
      a.pid.localeCompare(b.pid)
  );

  let currentTime = 0;
  let completed = 0;

  const remainingTime = proc.map(p => p.burstTime);
  const isCompleted = new Array(n).fill(false);

  const result = [];
  const ganttChart = [];

  let lastPid = null;

  while (completed < n) {
    let idx = -1;
    let minRemaining = Infinity;

    for (let i = 0; i < n; i++) {
      if (
        proc[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        remainingTime[i] > 0
      ) {
        if (
          remainingTime[i] < minRemaining ||
          (
            remainingTime[i] === minRemaining &&
            proc[i].arrivalTime <
              proc[idx]?.arrivalTime
          )
        ) {
          minRemaining = remainingTime[i];
          idx = i;
        }
      }
    }

    // CPU IDLE (jump instead of +1 → FIXED)
    if (idx === -1) {
      let nextArrival = Infinity;

      for (let i = 0; i < n; i++) {
        if (!isCompleted[i]) {
          nextArrival = Math.min(
            nextArrival,
            proc[i].arrivalTime
          );
        }
      }

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: nextArrival
      });

      currentTime = nextArrival;
      lastPid = "IDLE";
      continue;
    }

    const process = proc[idx];
    const pid = process.pid || `P${idx + 1}`;

    // Gantt handling (continuous merge)
    if (lastPid !== pid) {
      ganttChart.push({
        pid,
        startTime: currentTime,
        endTime: currentTime + 1
      });
    } else {
      ganttChart[ganttChart.length - 1].endTime++;
    }

    remainingTime[idx]--;
    currentTime++;
    lastPid = pid;

    // completion
    if (remainingTime[idx] === 0) {
      isCompleted[idx] = true;
      completed++;

      const completionTime = currentTime;
      const turnaroundTime =
        completionTime - process.arrivalTime;

      const waitingTime =
        turnaroundTime - process.burstTime;

      result.push({
        pid,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime,
        turnaroundTime,
        waitingTime
      });
    }
  }

  const avgWaitingTime =
    result.reduce((a, b) => a + b.waitingTime, 0) / n;

  const avgTurnaroundTime =
    result.reduce((a, b) => a + b.turnaroundTime, 0) / n;

  return {
    result,
    ganttChart,
    averageWaitingTime: avgWaitingTime.toFixed(2),
    averageTurnaroundTime: avgTurnaroundTime.toFixed(2)
  };
}

module.exports = srjf;