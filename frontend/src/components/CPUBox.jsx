export default function CPUBox({
  currentState
}) {

  return (

    <div className="cpu-box">

      <h2>CPU</h2>

      <h1>

        {
          currentState?.running ||
          "IDLE"
        }

      </h1>

      <p>

        Time:
        {
          currentState?.time || 0
        }

      </p>

    </div>

  );

}