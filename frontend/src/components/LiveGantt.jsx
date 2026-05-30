export default function LiveGantt({
  gantt
}) {

  return (

    <div className="gantt-container">

      <h2>
        Live Gantt Chart
      </h2>

      <div className="gantt-chart">

        {

          !gantt || gantt.length === 0

          ? (

            <p>
              No Execution Yet
            </p>

          )

          : (

            gantt.map(
              (
                block,
                index
              ) => {

                const duration =
                  block.end - block.start;

                return (

                  <div
                    className={
                      block.process === "IDLE"
                        ? "gantt-block idle"
                        : "gantt-block"
                    }
                    key={`${block.process}-${index}`}
                    style={{
                      minWidth: `${duration * 60}px`
                    }}
                  >

                    <h3>

                      {
                        block.process ||
                        "IDLE"
                      }

                    </h3>

                    <p>

                      {
                        block.start
                      }

                      {" - "}

                      {
                        block.end
                      }

                    </p>

                  </div>

                );

              }
            )

          )

        }

      </div>

    </div>

  );

}