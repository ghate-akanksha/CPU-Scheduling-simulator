function priorityLive(
  processes
) {

  let currentTime = 0;

  let completed = 0;

  let n = processes.length;

  let timeline = [];

  let isCompleted =
    new Array(n).fill(false);

  while (completed !== n) {

    let idx = -1;

    let highestPriority =
      Infinity;

    // Find highest priority
    for (let i = 0; i < n; i++) {

      if (

        processes[i].arrivalTime
          <= currentTime &&

        !isCompleted[i]

      ) {

        if (

          processes[i].priority
          < highestPriority

        ) {

          highestPriority =
            processes[i]
              .priority;

          idx = i;

        }

      }

    }

    // CPU IDLE
    if (idx === -1) {

      timeline.push({

        time: currentTime,

        running: "IDLE",

        readyQueue: []

      });

      currentTime++;

      continue;

    }

    let process =
      processes[idx];

    // Execute fully
    for (
      let t = 0;
      t < process.burstTime;
      t++
    ) {

      let readyQueue =
        processes

          .filter(

            (p, index) =>

              !isCompleted[index] &&

              index !== idx &&

              p.arrivalTime
                <= currentTime

          )

          .map((p) => p.pid);

      timeline.push({

        time: currentTime,

        running: process.pid,

        readyQueue

      });

      currentTime++;

    }

    isCompleted[idx] = true;

    completed++;

  }

  return timeline;

}

module.exports =
  priorityLive;