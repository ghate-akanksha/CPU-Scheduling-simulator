// =========================
// CREATE LIVE TIMELINE
// =========================

function createLiveTimeline(
  ganttChart
) {

  let timeline = [];

  // Loop through all gantt blocks

  ganttChart.forEach(
    (block) => {

      // Add each second separately

      for (

        let time =
          block.startTime;

        time <
          block.endTime;

        time++

      ) {

        timeline.push({

          pid: block.pid,

          currentTime:
            time,

          nextTime:
            time + 1

        });

      }

    }
  );

  return timeline;

}

module.exports =
  createLiveTimeline;