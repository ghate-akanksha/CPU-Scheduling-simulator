// Round Robin Scheduling Algorithm

function roundRobin(processes, quantum) {

  let n = processes.length;
  let currentTime = 0;
  let queue = [];

  let remainingTime = processes.map(p => p.burstTime);
  let completed = 0;

  let result = [];
  let ganttChart = [];

  let visited = new Array(n).fill(false);

  // Sort by arrival time initially
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  queue.push(0);
  visited[0] = true;

  while (completed !== n) {

    if (queue.length === 0) {
      currentTime++;
      for (let i = 0; i < n; i++) {
        if (!visited[i] && processes[i].arrivalTime <= currentTime) {
          queue.push(i);
          visited[i] = true;
        }
      }
      continue;
    }

    let idx = queue.shift();
    let process = processes[idx];
    let pid = process.pid || `P${idx + 1}`;

    let startTime = currentTime;

    // Execute process
    let execTime = Math.min(quantum, remainingTime[idx]);

    currentTime += execTime;
    remainingTime[idx] -= execTime;

    ganttChart.push({
      pid,
      startTime,
      endTime: currentTime
    });

    // Add newly arrived processes
    for (let i = 0; i < n; i++) {
      if (!visited[i] && processes[i].arrivalTime <= currentTime) {
        queue.push(i);
        visited[i] = true;
      }
    }

    // If process not finished → requeue
    if (remainingTime[idx] > 0) {
      queue.push(idx);
    } else {

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

module.exports = roundRobin;