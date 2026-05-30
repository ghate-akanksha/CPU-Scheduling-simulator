function roundRobin(processes, quantum) {
  let n = processes.length;
  let currentTime = 0;

  let queue = [];
  let result = [];
  let ganttChart = [];

  let remainingTime = processes.map(p => p.burstTime);
  let completed = 0;

  let visited = new Array(n).fill(false);

  // IMPORTANT: do NOT mutate original input
  let sorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );

  // helper: add newly arrived processes
  function addArrivals() {
    for (let i = 0; i < n; i++) {
      if (
        !visited[i] &&
        sorted[i].arrivalTime <= currentTime
      ) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }

  addArrivals();

  while (completed < n) {
    if (queue.length === 0) {
      // jump to next arrival (FIXED IDLE HANDLING)
      let nextArrival = Infinity;

      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          nextArrival = Math.min(
            nextArrival,
            sorted[i].arrivalTime
          );
        }
      }

      ganttChart.push({
        pid: "IDLE",
        startTime: currentTime,
        endTime: nextArrival
      });

      currentTime = nextArrival;
      addArrivals();
      continue;
    }

    let idx = queue.shift();
    let process = sorted[idx];

    let startTime = currentTime;

    let execTime = Math.min(quantum, remainingTime[idx]);

    currentTime += execTime;
    remainingTime[idx] -= execTime;

    ganttChart.push({
      pid: process.pid,
      startTime,
      endTime: currentTime
    });

    addArrivals();

    if (remainingTime[idx] > 0) {
      queue.push(idx);
    } else {
      completed++;

      let completionTime = currentTime;
      let turnaroundTime =
        completionTime - process.arrivalTime;

      let waitingTime =
        turnaroundTime - process.burstTime;

      result.push({
        pid: process.pid,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime,
        turnaroundTime,
        waitingTime
      });
    }
  }

  return { result, ganttChart };
}

module.exports = roundRobin;