import "./GanttChart.css";

const GanttChart = ({
  gantt = []
}) => {

  if (gantt.length === 0) {

    return (

      <div className="gantt-container">

        <h2>
          Gantt Chart
        </h2>

        <p>
          No Gantt Chart Available
        </p>

      </div>

    );

  }

  const totalTime =
    gantt[gantt.length - 1].endTime;

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

                  <div className="process-name">

                    {item.pid}

                  </div>

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