import "./TimelineControls.css";

const TimelineControls = ({

  isPlaying,

  setIsPlaying,

  nextStep,

  prevStep,

  resetSimulation,

  speed,

  setSpeed,

  currentIndex,

  totalSteps

}) => {

  return (

    <div className="controls-container">

      <button

        className={`control-btn play-btn ${
          isPlaying
            ? "pause"
            : ""
        }`}

        onClick={() =>
          setIsPlaying(
            !isPlaying
          )
        }

      >

        {
          isPlaying
            ? "⏸ Pause"
            : "▶ Play"
        }

      </button>

      <button
        className="control-btn"
        onClick={prevStep}
        disabled={currentIndex === 0}
      >

        ⏮ Prev

      </button>

      <button
        className="control-btn"
        onClick={nextStep}
        disabled={
          currentIndex >=
          totalSteps - 1
        }
      >

        ⏭ Next

      </button>

      <button
        className="control-btn"
        onClick={resetSimulation}
      >

        ⭮ Reset

      </button>

      <div className="speed-control">

        <label>

          Speed :

        </label>

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

          <option value={1500}>
            Slow
          </option>

          <option value={1000}>
            Normal
          </option>

          <option value={500}>
            Fast
          </option>

          <option value={200}>
            Very Fast
          </option>

        </select>

      </div>

      <div className="timeline-progress">

        Step :
        {" "}

        {currentIndex}

        {" / "}

        {Math.max(totalSteps - 1, 0)}

      </div>

    </div>

  );

};

export default TimelineControls;