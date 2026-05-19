// SRJF / SRTF (Preemptive SJF Scheduling Algorithm)

function srjf(processes) {

  let n = processes.length;
  let currentTime = 0;
  let completed = 0;

  let remainingTime = processes.map(p => p.burstTime);
  let isCompleted = new Array(n).fill(false);

  let result = [];
  let ganttChart = [];

  let lastProcess = null;
  let startTime = 0;

  while (completed !== n) {

    let idx = -1;
    let minRemaining = Infinity;

    // Find process with shortest remaining time
    for (let i = 0; i < n; i++) {

      if (
        processes[i].arrivalTime <= currentTime &&
        !isCompleted[i] &&
        remainingTime[i] > 0
      ) {

        if (remainingTime[i] < minRemaining) {
          minRemaining = remainingTime[i];
          idx = i;
        }
      }
    }

    // ================= CPU IDLE =================
    if (idx === -1) {

      if (lastProcess !== "IDLE") {
        startTime = currentTime;
        lastProcess = "IDLE";
      }

      currentTime++;

      // close idle block when process comes
      if (lastProcess === "IDLE") {
        ganttChart.push({
          pid: "IDLE",
          startTime,
          endTime: currentTime
        });
      }

      continue;
    }

    let process = processes[idx];
    let pid = process.pid || `P${idx + 1}`;

    // ================= CONTEXT SWITCH =================
    if (lastProcess !== pid) {

      startTime = currentTime;

      ganttChart.push({
        pid,
        startTime,
        endTime: currentTime + 1
      });

    } else {
      // extend last block
      ganttChart[ganttChart.length - 1].endTime++;
    }

    remainingTime[idx]--;
    currentTime++;
    lastProcess = pid;

    // ================= PROCESS COMPLETION =================
    if (remainingTime[idx] === 0) {

      isCompleted[idx] = true;
      completed++;

      let completionTime = currentTime;
      let turnaroundTime = completionTime - process.arrivalTime;
      let waitingTime = turnaroundTime - process.burstTime;

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

  return {
    result,
    ganttChart
  };
}

module.exports = srjf;