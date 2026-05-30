function srjfLive(processes) {

  let currentTime = 0;

  let completedCount = 0;

  const n = processes.length;

  const timeline = [];

  const remainingTime =
    processes.map(
      p => p.burstTime
    );

  while (
    completedCount < n
  ) {

    let idx = -1;

    let shortest =
      Infinity;

    // Find shortest remaining process

    for (
      let i = 0;
      i < n;
      i++
    ) {

      if (

        processes[i].arrivalTime <=
          currentTime &&

        remainingTime[i] > 0

      ) {

        if (

          remainingTime[i] <
          shortest

        ) {

          shortest =
            remainingTime[i];

          idx = i;

        }

      }

    }

    // CPU IDLE

    if (
      idx === -1
    ) {

      timeline.push({

        time: currentTime,

        running: "IDLE",

        readyQueue: [],

        completed:

          processes

            .filter(
              (p, i) =>
                remainingTime[i] === 0
            )

            .map(
              p => p.pid
            ),

        remainingTimes:

          Object.fromEntries(

            processes.map(
              (p, i) => [

                p.pid,

                remainingTime[i]

              ]
            )

          )

      });

      currentTime++;

      continue;

    }

    const readyQueue =

      processes

        .filter(

          (p, i) =>

            i !== idx &&

            p.arrivalTime <=
              currentTime &&

            remainingTime[i] > 0

        )

        .map(
          p => p.pid
        );

    timeline.push({

      time: currentTime,

      running:
        processes[idx].pid,

      readyQueue,

      completed:

        processes

          .filter(
            (p, i) =>
              remainingTime[i] === 0
          )

          .map(
            p => p.pid
          ),

      remainingTimes:

        Object.fromEntries(

          processes.map(
            (p, i) => [

              p.pid,

              remainingTime[i]

            ]
          )

        )

    });

    // Execute 1 unit

    remainingTime[idx]--;

    if (
      remainingTime[idx] === 0
    ) {

      completedCount++;

    }

    currentTime++;

  }

  // FINAL IDLE STATE

  timeline.push({

    time: currentTime,

    running: "IDLE",

    readyQueue: [],

    completed:

      processes.map(
        p => p.pid
      ),

    remainingTimes:

      Object.fromEntries(

        processes.map(
          p => [

            p.pid,

            0

          ]
        )

      )

  });

  return timeline;

}

module.exports =
  srjfLive;