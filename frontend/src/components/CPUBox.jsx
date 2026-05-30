export default function CPUBox({
  currentState
}) {

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

  const currentTime =
    currentState?.time ?? 0;

  const isIdle =
    runningProcess === "IDLE";

  return (

    <div className="cpu-box">

      <h2>
        CPU
      </h2>

      <div
        className={
          isIdle
            ? "cpu-idle"
            : "cpu-running"
        }
      >

        <h1>

          {runningProcess}

        </h1>

      </div>

      <p>

        Current Time :
        {" "}
        {currentTime}

      </p>

      <p>

        Status :
        {" "}

        {
          isIdle
            ? "IDLE"
            : "RUNNING"
        }

      </p>

    </div>

  );

}