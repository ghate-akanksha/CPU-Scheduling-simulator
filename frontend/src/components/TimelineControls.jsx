import "./TimelineControls.css";

const TimelineControls = ({
  isPlaying,
  setIsPlaying,
  nextStep,
  prevStep,
  resetSimulation
}) => {

  return (

    <div className="controls-container">

      {/* PLAY / PAUSE */}

      <button
        className={`control-btn play-btn ${
          isPlaying ? "pause" : ""
        }`}
        onClick={() =>
          setIsPlaying(
            !isPlaying
          )
        }
      >

        <span className="btn-icon">

          {
            isPlaying
              ? "⏸"
              : "▶"
          }

        </span>

        {
          isPlaying
            ? "Pause"
            : "Play"
        }

      </button>

      {/* PREVIOUS */}

      <button
        className="control-btn prev-btn"
        onClick={prevStep}
      >

        <span className="btn-icon">

          ⏮

        </span>

        Prev

      </button>

      {/* NEXT */}

      <button
        className="control-btn next-btn"
        onClick={nextStep}
      >

        <span className="btn-icon">

          ⏭

        </span>

        Next

      </button>

      {/* RESET */}

      <button
        className="control-btn reset-btn"
        onClick={resetSimulation}
      >

        <span className="btn-icon">

          ⭮

        </span>

        Reset

      </button>

    </div>

  );

};

export default TimelineControls;