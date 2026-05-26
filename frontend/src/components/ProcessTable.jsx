export default function
ProcessTable({

  currentState

}) {

  return (

    <div className="process-table">

      <h2>
        Current Process State
      </h2>

      <table>

        <thead>

          <tr>

            <th>Time</th>

            <th>Running</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>
              {
                currentState?.time
              }
            </td>

            <td>
              {
                currentState?.running
              }
            </td>

          </tr>

        </tbody>

      </table>

    </div>

  );

}