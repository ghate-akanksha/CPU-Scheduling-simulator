// FCFS Scheduling Algorithm

function fcfs(processes) {

  // Current CPU execution time
  let currentTime = 0;

  // Stores final calculated process data
  let result = [];

  // Stores Gantt Chart blocks
  let ganttChart = [];

  // Sort processes according to arrival time
  processes.sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );

  // Execute processes one by one
  processes.forEach((process) => {

    // Handle CPU idle condition
    if (currentTime < process.arrivalTime) {
      currentTime = process.arrivalTime;
    }

    // Process execution starts here
    let startTime = currentTime;

    // Completion Time
    let completionTime =
      startTime + process.burstTime;

    // Turnaround Time
    let turnaroundTime =
      completionTime - process.arrivalTime;

    // Waiting Time
    let waitingTime =
      turnaroundTime - process.burstTime;

    // Store final process result
    result.push({

      pid: process.pid,

      arrivalTime: process.arrivalTime,

      burstTime: process.burstTime,

      startTime,

      completionTime,

      turnaroundTime,

      waitingTime

    });

    // Store Gantt Chart data
    ganttChart.push({

      pid: process.pid,

      startTime,

      endTime: completionTime

    });

    // Move CPU time forward
    currentTime = completionTime;

  });

  // Return final output
  return {

    result,

    ganttChart

  };

}

// Export FCFS function
module.exports = fcfs;