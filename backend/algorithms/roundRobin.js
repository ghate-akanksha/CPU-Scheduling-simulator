function roundRobin(processes, quantum) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const n = sorted.length;

  let currentTime = 0;
  let completed = 0;
  let queue = [];
  let result = [];
  let ganttChart = [];

  let remainingTime = sorted.map(p => p.burstTime);
  let i = 0; // pointer for arrivals

  function addArrivals() {
    while (i < n && sorted[i].arrivalTime <= currentTime) {
      queue.push(i);
      i++;
    }
  }

  addArrivals();

  while (completed < n) {

    if (queue.length === 0) {
      currentTime = sorted[i].arrivalTime;
      addArrivals();
      continue;
    }

    const idx = queue.shift();
    const process = sorted[idx];

    const execTime = Math.min(quantum, remainingTime[idx]);

    const startTime = currentTime;
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

      const completionTime = currentTime;
      const tat = completionTime - process.arrivalTime;
      const wt = tat - process.burstTime;

      result.push({
        pid: process.pid,
        arrivalTime: process.arrivalTime,
        burstTime: process.burstTime,
        completionTime,
        turnaroundTime: tat,
        waitingTime: wt
      });
    }
  }

  return { result, ganttChart };
}

module.exports = roundRobin;