export const generateGanttChart = (timeline) => {

  if (!Array.isArray(timeline) || timeline.length === 0) {
    return [];
  }

  const gantt = [];

  let currentProcess = timeline[0].running || "IDLE";
  let startTime = timeline[0].time;

  for (let i = 1; i < timeline.length; i++) {

    const running = timeline[i].running || "IDLE";

    // process change → close previous block
    if (running !== currentProcess) {

      gantt.push({
        process: currentProcess,
        start: startTime,
        end: timeline[i].time
      });

      currentProcess = running;
      startTime = timeline[i].time;
    }
  }

  // push last block
  gantt.push({
    process: currentProcess,
    start: startTime,
    end: timeline[timeline.length - 1].time + 1
  });

  return gantt;
};