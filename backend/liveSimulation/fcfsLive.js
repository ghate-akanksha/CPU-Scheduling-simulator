function fcfsLive(processes) {

  let currentTime = 0;

  const timeline = [];

  const sortedProcesses =
    [...processes].sort(
      (a, b) =>
        a.arrivalTime -
        b.arrivalTime
    );

  const remainingTimes =
    sortedProcesses.map(
      p => p.burstTime
    );

  const completed = [];

  for (
    let i = 0;
    i < sortedProcesses.length;
    i++
  ) {

    const process =
      sortedProcesses[i];

    // CPU Idle

    while (
      currentTime <
      process.arrivalTime
    ) {

      timeline.push({

        time: currentTime,

        running: "IDLE",

        readyQueue: [],

        completed:
          [...completed],

        remainingTimes:
          Object.fromEntries(

            sortedProcesses.map(
              (p, idx) => [

                p.pid,

                remainingTimes[idx]

              ]
            )

          )

      });

      currentTime++;

    }

    // Execute Process

    for (
      let t = 0;
      t < process.burstTime;
      t++
    ) {

      const readyQueue =

        sortedProcesses

          .filter(

            (p, idx) =>

              idx > i &&

              p.arrivalTime <=
                currentTime

          )

          .map(
            p => p.pid
          );

      timeline.push({

        time: currentTime,

        running:
          process.pid,

        readyQueue,

        completed:
          [...completed],

        remainingTimes:
          Object.fromEntries(

            sortedProcesses.map(
              (p, idx) => [

                p.pid,

                remainingTimes[idx]

              ]
            )

          )

      });

      remainingTimes[i]--;

      currentTime++;

    }

    // Mark process complete

    remainingTimes[i] = 0;

    completed.push(
      process.pid
    );

  }

  // Final State

  const allCompleted =
    remainingTimes.every(
      value => value === 0
    );

  if (allCompleted) {

    timeline.push({

      time: currentTime,

      running: "IDLE",

      readyQueue: [],

      completed:
        [...completed],

      remainingTimes:
        Object.fromEntries(

          sortedProcesses.map(
            (p, idx) => [

              p.pid,

              remainingTimes[idx]

            ]
          )

        )

    });

  }

  return timeline;

}

module.exports =
  fcfsLive;