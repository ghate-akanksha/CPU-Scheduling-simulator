export default function ReadyQueue({
  currentState
}) {

  const readyQueue =
  Array.isArray(
    currentState?.readyQueue
  )
    ? currentState.readyQueue
    : [];
    
console.log(
  "Ready Queue:",
  readyQueue
);
  return (

    <div className="queue-box">

      <h2>
        Ready Queue
      </h2>

      {

        readyQueue.length === 0

        ? (

          <div className="empty-queue">

            <p>
              Queue Empty
            </p>

          </div>

        )

        : (

          <div className="queue-list">

            {

              readyQueue.map(
                (
                  process,
                  index
                ) => (

                  <div
                    className="queue-item"
                    key={`${process}-${index}`}
                  >

                    <h3>
                      {process}
                    </h3>

                    <small>

                      Position :
                      {" "}
                      {index + 1}

                    </small>

                  </div>

                )
              )

            }

          </div>

        )

      }

      <div className="queue-footer">

        <p>

          Total Waiting :
          {" "}
          {readyQueue.length}

        </p>

      </div>

    </div>

  );

}