import "./MetricsTable.css";

const MetricsTable = ({
  result
}) => {


  const processes =
    result?.result || [];


  const avgWaitingTime =
    (
      processes.reduce(
        (sum, p) =>
          sum + p.waitingTime,
        0
      ) / processes.length
    ).toFixed(2);

  const avgTurnaroundTime =
    (
      processes.reduce(
        (sum, p) =>
          sum + p.turnaroundTime,
        0
      ) / processes.length
    ).toFixed(2);

  return (

    <div className="metrics-container">

      <h2>
        Scheduling Metrics
      </h2>


      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>PID</th>

              <th>
                Arrival
              </th>

              <th>
                Burst
              </th>

              <th>
                Start
              </th>

              <th>
                Completion
              </th>

              <th>
                Waiting
              </th>

              <th>
                Turnaround
              </th>

            </tr>

          </thead>

          <tbody>

            {
              processes.map(
                (p, index) => (

                  <tr key={index}>

                    <td>
                      {p.pid}
                    </td>

                    <td>
                      {
                        p.arrivalTime
                      }
                    </td>

                    <td>
                      {
                        p.burstTime
                      }
                    </td>

                    <td>
                      {p.startTime}
                    </td>

                    <td>
                      {
                        p.completionTime
                      }
                    </td>

                    <td>
                      {
                        p.waitingTime
                      }
                    </td>

                    <td>
                      {
                        p.turnaroundTime
                      }
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

     

      <div className="metrics-cards">

        <div className="metric-card">

          <h3>
            Avg Waiting Time
          </h3>

          <p>
            {avgWaitingTime}
          </p>

        </div>

        <div className="metric-card">

          <h3>
            Avg Turnaround Time
          </h3>

          <p>
            {avgTurnaroundTime}
          </p>

        </div>

      </div>

    </div>

  );
};

export default MetricsTable;