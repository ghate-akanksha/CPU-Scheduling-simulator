// Priority Scheduling (Non-Preemptive)

function priorityScheduling(processes) {

  console.log("PRIORITY START");

  let n = processes.length;

  let currentTime = 0;

  let completed = 0;

  let isCompleted =
    new Array(n).fill(false);

  let result = [];

  let ganttChart = [];

  let safety = 0;

  while (completed !== n) {

    safety++;

    // SAFETY CHECK

    if (safety > 1000) {

      console.log(
        "INFINITE LOOP DETECTED"
      );

      break;
    }

    let idx = -1;

    let highestPriority =
      Infinity;

    // FIND PROCESS

    for (let i = 0; i < n; i++) {

      if (

        processes[i].arrivalTime
        <= currentTime &&

        !isCompleted[i]

      ) {

        // DEFAULT PRIORITY

        let priority =
          Number(
            processes[i].priority
          ) || 999;

        if (
          priority <
          highestPriority
        ) {

          highestPriority =
            priority;

          idx = i;
        }
      }
    }

    // CPU IDLE

    if (idx === -1) {

      currentTime++;

      ganttChart.push({

        pid: "IDLE",

        startTime:
          currentTime - 1,

        endTime:
          currentTime

      });

      continue;
    }

    let process =
      processes[idx];

    let pid =
      process.pid ||
      `P${idx + 1}`;

    let startTime =
      currentTime;

    let completionTime =
      startTime +
      process.burstTime;

    let turnaroundTime =
      completionTime -
      process.arrivalTime;

    let waitingTime =
      turnaroundTime -
      process.burstTime;

    result.push({

      pid,

      arrivalTime:
        process.arrivalTime,

      burstTime:
        process.burstTime,

      priority:
        process.priority,

      startTime,

      completionTime,

      turnaroundTime,

      waitingTime

    });

    ganttChart.push({

      pid,

      startTime,

      endTime:
        completionTime

    });

    currentTime =
      completionTime;

    isCompleted[idx] = true;

    completed++;
  }

  console.log("PRIORITY DONE");

  return {

    result,

    ganttChart

  };
}

module.exports =
  priorityScheduling;