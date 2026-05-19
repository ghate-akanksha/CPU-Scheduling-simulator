import "./ProcessForm.css";

import { useState } from "react";

const ProcessForm = ({
  onSimulate
}) => {

  // =========================
  // STATES
  // =========================

  const [processes, setProcesses] =
    useState([]);

  const [process, setProcess] =
    useState({
      pid: "",
      arrivalTime: "",
      burstTime: "",
      priority: ""
    });

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {

    setProcess({
      ...process,
      [e.target.name]:
        e.target.value
    });

  };

  // =========================
  // ADD PROCESS
  // =========================

  const addProcess = () => {

    if (
      process.pid === "" ||
      process.arrivalTime === "" ||
      process.burstTime === ""
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const newProcess = {

      pid: process.pid,

      arrivalTime:
        Number(process.arrivalTime),

      burstTime:
        Number(process.burstTime),

      priority:
        Number(process.priority)
    };

    setProcesses([
      ...processes,
      newProcess
    ]);

    // RESET FORM

    setProcess({
      pid: "",
      arrivalTime: "",
      burstTime: "",
      priority: ""
    });

  };

  // =========================
  // DELETE PROCESS
  // =========================

  const deleteProcess = (index) => {

    const updatedProcesses =
      processes.filter(
        (_, i) => i !== index
      );

    setProcesses(updatedProcesses);

  };

  // =========================
  // RUN SIMULATION
  // =========================

  const runSimulation = () => {

    if (processes.length === 0) {

      alert(
        "Please add processes"
      );

      return;
    }

    onSimulate(processes);

  };

  return (

    <div className="process-form">

      <h2>
        Add Process
      </h2>

      {/* ========================= */}
      {/* INPUTS */}
      {/* ========================= */}

      <div className="input-group">

        <input
          type="text"
          name="pid"
          placeholder="Process ID"
          value={process.pid}
          onChange={handleChange}
        />

        <input
          type="number"
          name="arrivalTime"
          placeholder="Arrival Time"
          value={process.arrivalTime}
          onChange={handleChange}
        />

        <input
          type="number"
          name="burstTime"
          placeholder="Burst Time"
          value={process.burstTime}
          onChange={handleChange}
        />

        <input
          type="number"
          name="priority"
          placeholder="Priority"
          value={process.priority}
          onChange={handleChange}
        />

      </div>

      {/* ========================= */}
      {/* BUTTONS */}
      {/* ========================= */}

      <div className="btn-group">

        <button
          className="add-btn"
          onClick={addProcess}
        >
          Add Process
        </button>

        <button
          className="run-btn"
          onClick={runSimulation}
        >
          Run Simulation
        </button>

      </div>

      {/* ========================= */}
      {/* PROCESS TABLE */}
      {/* ========================= */}

      {
        processes.length > 0 && (

          <div className="table-container">

            <h3>
              Process Queue
            </h3>

            <table>

              <thead>

                <tr>

                  <th>PID</th>

                  <th>
                    Arrival
                  </th>

                  <th>
                    Burst
                  </th>

                  <th>
                    Priority
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {
                  processes.map(
                    (p, index) => (

                      <tr key={index}>

                        <td>
                          {p.pid}
                        </td>

                        <td>
                          {
                            p.arrivalTime
                          }
                        </td>

                        <td>
                          {
                            p.burstTime
                          }
                        </td>

                        <td>
                          {p.priority}
                        </td>

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteProcess(index)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )
                }

              </tbody>

            </table>

          </div>

        )
      }

    </div>

  );
};

export default ProcessForm;