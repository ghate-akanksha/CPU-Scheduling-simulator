function rrLive(
  processes,
  timeQuantum
) {

  let timeline = [];

  let currentTime = 0;

  let queue = [];

  let visited = [];

  let remainingTime =
    processes.map(
      (p) => p.burstTime
    );

  // First process
  queue.push(0);

  visited[0] = true;

  while (queue.length > 0) {

    let idx = queue.shift();

    let executeTime =
      Math.min(
        timeQuantum,
        remainingTime[idx]
      );

    for (
      let t = 0;
      t < executeTime;
      t++
    ) {

      // Add newly arrived
      for (
        let i = 0;
        i < processes.length;
        i++
      ) {

        if (

          processes[i]
            .arrivalTime
            <= currentTime &&

          !visited[i]

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
            (i) =>
              processes[i].pid
          )

      });

      remainingTime[idx]--;

      currentTime++;

    }

    // Re-add process
    if (
      remainingTime[idx] > 0
    ) {

      queue.push(idx);

    }

  }

  return timeline;

}

module.exports = rrLive;