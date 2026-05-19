import "./AlgorithmSelector.css";

const AlgorithmSelector = ({
  algorithm,
  setAlgorithm
}) => {

  return (

    <div className="algorithm-selector">

      <h2>
        Select Algorithm
      </h2>

      <select
        value={algorithm}
        onChange={(e) =>
          setAlgorithm(e.target.value)
        }
      >

        <option value="fcfs">
          FCFS
        </option>

        <option value="sjf">
          SJF
        </option>

        <option value="srtf">
          SRTF
        </option>

        <option value="rr">
          Round Robin
        </option>

        <option value="priority">
          Priority Scheduling
        </option>

      </select>


      <div className="algorithm-info">

        {
          algorithm === "fcfs" && (
            <p>
              First Come First Serve
              executes processes in
              arrival order.
            </p>
          )
        }

        {
          algorithm === "sjf" && (
            <p>
              Shortest Job First
              selects the process
              with minimum burst time.
            </p>
          )
        }

        {
          algorithm === "srtf" && (
            <p>
              Shortest Remaining Time
              First is the preemptive
              version of SJF.
            </p>
          )
        }

        {
          algorithm === "rr" && (
            <p>
              Round Robin allocates
              CPU using time quantum.
            </p>
          )
        }

        {
          algorithm === "priority" && (
            <p>
              Priority Scheduling
              executes higher priority
              processes first.
            </p>
          )
        }

      </div>

    </div>

  );
};

export default AlgorithmSelector;