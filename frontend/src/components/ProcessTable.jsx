import "./ProcessTable.css";

export default function ProcessTable({

  processes = [],

  currentState = {}

}) {

  const completed =
    currentState.completed || [];

  const running =
    currentState.running || null;

  const readyQueue =
    currentState.readyQueue || [];

  const remainingTimes =
    currentState.remainingTimes || {};

  return (

    <div className="process-table">

      <h2>
        Process State Table
      </h2>

      <table>

        <thead>

          <tr>

            <th>PID</th>

            <th>Arrival</th>

            <th>Burst</th>

            <th>Remaining</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {

            processes.map((process) => {

              let status =
                "WAITING";

              if (

                completed
                  .map(String)
                  .includes(
                    String(
                      process.pid
                    )
                  )

              ) {

                status =
                  "COMPLETED";

              }

              else if (

  String(
    running
  ) ===
  String(
    process.pid
  )

  &&

  !completed
    .map(String)
    .includes(
      String(
        process.pid
      )
    )

) {

                status =
                  "RUNNING";

              }

              else if (

                readyQueue
                  .map(String)
                  .includes(
                    String(
                      process.pid
                    )
                  )

              ) {

                status =
                  "READY";

              }

              return (

                <tr
                  key={
                    process.pid
                  }
                >

                  <td>
                    {process.pid}
                  </td>

                  <td>
                    {process.arrivalTime}
                  </td>

                  <td>
                    {process.burstTime}
                  </td>

                  <td>

                    {

                      remainingTimes[
                        process.pid
                      ] ??

                      process.burstTime

                    }

                  </td>

                  <td>

                    <span
                      className={`status-badge ${status.toLowerCase()}`}
                    >

                      {status}

                    </span>

                  </td>

                </tr>

              );

            })

          }

        </tbody>

      </table>

    </div>

  );

}