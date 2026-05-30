function rrLive(
  processes,
  timeQuantum
) {

  const timeline = [];

  let currentTime = 0;

  const n = processes.length;

  const queue = [];

  const visited =
    new Array(n).fill(false);

  const remainingTime =
    processes.map(
      p => p.burstTime
    );

  let completed = 0;

  while (
    completed < n
  ) {

    // Add arrived processes

    for (
      let i = 0;
      i < n;
      i++
    ) {

      if (

        !visited[i] &&

        processes[i].arrivalTime <=
          currentTime

      ) {

        queue.push(i);

        visited[i] = true;

      }

    }

    // CPU IDLE

    if (
      queue.length === 0
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

    const idx =
      queue.shift();

    const executeTime =
      Math.min(

        timeQuantum,

        remainingTime[idx]

      );

    for (
      let t = 0;
      t < executeTime;
      t++
    ) {

      // New arrivals

      for (
        let i = 0;
        i < n;
        i++
      ) {

        if (

          !visited[i] &&

          processes[i].arrivalTime <=
            currentTime

        ) {

          queue.push(i);

          visited[i] = true;

        }

      }

      timeline.push({

        time: currentTime,

        running:
          processes[idx].pid,

        readyQueue:

          queue.map(
            i =>
              processes[i].pid
          ),

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

      remainingTime[idx]--;

      currentTime++;

    }

    if (
      remainingTime[idx] > 0
    ) {

      queue.push(idx);

    }

    else {

      remainingTime[idx] = 0;

      completed++;

    }

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
  rrLive;