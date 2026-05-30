function sjfLive(processes) {

  let currentTime = 0;

  let completedCount = 0;

  const n = processes.length;

  const timeline = [];

  const isCompleted =
    new Array(n).fill(false);

  const remainingTimes =
    processes.map(
      p => p.burstTime
    );

  while (
    completedCount < n
  ) {

    let idx = -1;

    let shortestBurst =
      Infinity;

    // Find shortest available job

    for (
      let i = 0;
      i < n;
      i++
    ) {

      if (

        processes[i].arrivalTime <=
          currentTime &&

        !isCompleted[i]

      ) {

        if (

          processes[i].burstTime <
          shortestBurst

        ) {

          shortestBurst =
            processes[i].burstTime;

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
                isCompleted[i]
            )

            .map(
              p => p.pid
            ),

        remainingTimes:

          Object.fromEntries(

            processes.map(
              (p, i) => [

                p.pid,

                remainingTimes[i]

              ]
            )

          )

      });

      currentTime++;

      continue;

    }

    const process =
      processes[idx];

    // Execute entire burst

    for (
      let t = 0;
      t < process.burstTime;
      t++
    ) {

      const readyQueue =

        processes

          .filter(

            (p, i) =>

              i !== idx &&

              !isCompleted[i] &&

              p.arrivalTime <=
                currentTime

          )

          .map(
            p => p.pid
          );

      timeline.push({

        time: currentTime,

        running: process.pid,

        readyQueue,

        completed:

          processes

            .filter(
              (p, i) =>
                isCompleted[i]
            )

            .map(
              p => p.pid
            ),

        remainingTimes:

          Object.fromEntries(

            processes.map(
              (p, i) => [

                p.pid,

                remainingTimes[i]

              ]
            )

          )

      });

      remainingTimes[idx]--;

      currentTime++;

    }

    // Mark process complete

    remainingTimes[idx] = 0;

    isCompleted[idx] = true;

    completedCount++;

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
  sjfLive;