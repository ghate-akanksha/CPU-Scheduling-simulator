function rrLive(processes, timeQuantum) {
  const timeline = [];

  const sorted = [...processes].sort(
    (a, b) => a.arrivalTime - b.arrivalTime
  );

  const n = sorted.length;

  let currentTime = 0;
  let completed = 0;

  const queue = [];
  const visited = new Array(n).fill(false);

  const remainingTime = sorted.map(
    p => p.burstTime
  );

  function addArrivals() {
    for (let i = 0; i < n; i++) {
      if (
        !visited[i] &&
        sorted[i].arrivalTime <= currentTime
      ) {
        queue.push(i);
        visited[i] = true;
      }
    }
  }

  addArrivals();

  while (completed < n) {
    if (queue.length === 0) {
      timeline.push({
        time: currentTime,
        running: "IDLE",
        readyQueue: [],
        completed: sorted
          .filter((p, i) => remainingTime[i] === 0)
          .map(p => p.pid),
        remainingTimes: Object.fromEntries(
          sorted.map((p, i) => [
            p.pid,
            remainingTime[i]
          ])
        )
      });

      currentTime++;

      addArrivals();

      continue;
    }

    const idx = queue.shift();

    const executeTime = Math.min(
      timeQuantum,
      remainingTime[idx]
    );

    for (let t = 0; t < executeTime; t++) {
      timeline.push({
        time: currentTime,
        running: sorted[idx].pid,
        readyQueue: queue.map(
          i => sorted[i].pid
        ),
        completed: sorted
          .filter((p, i) => remainingTime[i] === 0)
          .map(p => p.pid),
        remainingTimes: Object.fromEntries(
          sorted.map((p, i) => [
            p.pid,
            remainingTime[i]
          ])
        )
      });

      remainingTime[idx]--;
      currentTime++;

      addArrivals();
    }

    if (remainingTime[idx] > 0) {
      queue.push(idx);
    } else {
      completed++;
    }
  }

  timeline.push({
    time: currentTime,
    running: "IDLE",
    readyQueue: [],
    completed: sorted.map(
      p => p.pid
    ),
    remainingTimes: Object.fromEntries(
      sorted.map(p => [p.pid, 0])
    )
  });

  return timeline;
}

module.exports = rrLive;