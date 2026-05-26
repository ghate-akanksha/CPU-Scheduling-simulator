function fcfsLive(processes) {

  let currentTime = 0;

  let timeline = [];

  // Sort by arrival time
  processes.sort(
    (a, b) =>
      a.arrivalTime - b.arrivalTime
  );

  for (let i = 0; i < processes.length; i++) {

    let process = processes[i];

    // CPU Idle
    while (
      currentTime < process.arrivalTime
    ) {

      timeline.push({
        time: currentTime,
        running: "IDLE",
        readyQueue: []
      });

      currentTime++;
    }

    // Execute Process
    for (
      let t = 0;
      t < process.burstTime;
      t++
    ) {

      // Ready Queue
      let readyQueue =
        processes
          .filter(
            (p, index) =>

              index > i &&
              p.arrivalTime <= currentTime
          )
          .map((p) => p.pid);

      timeline.push({

        time: currentTime,

        running: process.pid,

        readyQueue

      });

      currentTime++;
    }

  }

  return timeline;

}

module.exports = fcfsLive;