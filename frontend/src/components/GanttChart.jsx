import "./GanttChart.css";

const GanttChart = ({
  gantt
}) => {


  const totalTime =
    gantt[gantt.length - 1]?.endTime || 0;

  return (

    <div className="gantt-container">

      <h2>
        Gantt Chart
      </h2>

      <div className="gantt-chart">

        {
          gantt.map(
            (item, index) => {

              const duration =
                item.endTime -
                item.startTime;

              const width =
                (duration / totalTime) * 100;

              return (

                <div
                  key={index}
                  className="gantt-block"
                  style={{
                    width: `${width}%`
                  }}
                >

                  {/* Process Name */}

                  <div className="process-name">

                    {item.pid}

                  </div>

                  {/* Timeline */}

                  <div className="timeline">

                    <span>
                      {item.startTime}
                    </span>

                    <span>
                      {item.endTime}
                    </span>

                  </div>

                </div>

              );
            }
          )
        }

      </div>

    </div>
  );
};

export default GanttChart;