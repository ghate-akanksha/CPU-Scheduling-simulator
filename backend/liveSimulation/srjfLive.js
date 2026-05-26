function srjfLive(processes) {

  let currentTime = 0;

  let completed = 0;

  let n = processes.length;

  let timeline = [];

  // Remaining time
  let remainingTime =
    processes.map(
      (p) => p.burstTime
    );

  while (completed !== n) {

    let idx = -1;

    let shortest =
      Infinity;

    // Find shortest remaining
    for (let i = 0; i < n; i++) {

      if (

        processes[i].arrivalTime
          <= currentTime &&

        remainingTime[i] > 0

      ) {

        if (
          remainingTime[i]
          < shortest
        ) {

          shortest =
            remainingTime[i];

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

    // Ready Queue
    let readyQueue =
      processes

        .filter(

          (p, index) =>

            index !== idx &&

            p.arrivalTime
              <= currentTime &&

            remainingTime[index]
              > 0

        )

        .map((p) => p.pid);

    timeline.push({

      time: currentTime,

      running:
        processes[idx].pid,

      readyQueue

    });

    remainingTime[idx]--;

    currentTime++;

    if (
      remainingTime[idx] === 0
    ) {

      completed++;

    }

  }

  return timeline;

}

module.exports = srjfLive;