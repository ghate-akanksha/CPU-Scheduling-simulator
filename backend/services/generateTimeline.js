

function createLiveTimeline(
  ganttChart
) {

  let timeline = [];

 

  ganttChart.forEach(
    (block) => {

      

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