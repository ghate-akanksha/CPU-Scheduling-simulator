export default function LiveGantt({
  gantt
}) {

  return (

    <div className="gantt-container">

      <h2>Live Gantt Chart</h2>

      <div className="gantt-chart">

        {

          gantt.map(
            (p, index) => (

              <div
                className="gantt-block"
                key={index}
              >

                {p}

              </div>

            )
          )

        }

      </div>

    </div>

  );

}