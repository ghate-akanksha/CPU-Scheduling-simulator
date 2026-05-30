import "./SimulationStats.css";

const SimulationStats = ({

  currentState,

  algorithm,

  totalProcesses,

  completedCount

}) => {

  const currentTime =
    currentState?.time ?? 0;

  const allCompleted =

  currentState?.remainingTimes &&

  Object.values(
    currentState.remainingTimes
  ).every(
    time => time === 0
  );

const runningProcess =

  allCompleted

    ? "IDLE"

    : currentState?.running ||
      "IDLE";

  const readyQueueLength =
    currentState?.readyQueue
      ?.length ?? 0;

  return (

    <div className="stats-box">

      <div className="stat-card">

        <h3>
          Current Time
        </h3>

        <h1>
          {currentTime}
        </h1>

      </div>

      <div className="stat-card">

        <h3>
          Algorithm
        </h3>

        <h1>

          {
            algorithm?.toUpperCase()
          }

        </h1>

      </div>

      <div className="stat-card">

        <h3>
          Running
        </h3>

        <h1>
          {runningProcess}
        </h1>

      </div>

      <div className="stat-card">

        <h3>
          Ready Queue
        </h3>

        <h1>
          {readyQueueLength}
        </h1>

      </div>

      <div className="stat-card">

        <h3>
          Completed
        </h3>

        <h1>

          {
            completedCount
          }

          /

          {
            totalProcesses
          }

        </h1>

      </div>

    </div>

  );

};

export default SimulationStats;