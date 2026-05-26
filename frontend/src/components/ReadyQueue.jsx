export default function ReadyQueue({
  currentState
}) {

  return (

    <div className="queue-box">

      <h2>Ready Queue</h2>

      <div className="queue-list">

        {
          currentState?.readyQueue
          ?.length === 0

          ?

          <p>Empty</p>

          :

          currentState?.readyQueue
          ?.map((p, index) => (

            <div
              className="queue-item"
              key={index}
            >

              {p}

            </div>

          ))

        }

      </div>

    </div>

  );

}