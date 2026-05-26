export default function
SimulationControls({

  handleStart,

  handlePause,

  handleReset,

  speed,

  setSpeed

}) {

  return (

    <div className="controls">

      <button
        onClick={handleStart}
      >
        Start
      </button>

      <button
        onClick={handlePause}
      >
        Pause
      </button>

      <button
        onClick={handleReset}
      >
        Reset
      </button>

      <select

        value={speed}

        onChange={(e) =>
          setSpeed(
            Number(
              e.target.value
            )
          )
        }

      >

        <option value={1000}>
          1x
        </option>

        <option value={500}>
          2x
        </option>

        <option value={250}>
          4x
        </option>

      </select>

    </div>

  );

}