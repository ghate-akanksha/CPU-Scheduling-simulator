import "./ProcessForm.css";

import { useState } from "react";

const ProcessForm = ({
  onSimulate
}) => {


  const [processes, setProcesses] =
    useState([]);

 
  const [selectedAlgorithm,
    setSelectedAlgorithm] =
    useState("fcfs");

  
  const [timeQuantum,
    setTimeQuantum] =
    useState("");

  
  const [process, setProcess] =
    useState({
      pid: "",
      arrivalTime: "",
      burstTime: "",
      priority: ""
    });

  

  const handleChange = (e) => {

    setProcess({

      ...process,

      [e.target.name]:
        e.target.value

    });

  };

  

  const addProcess = () => {

    
    if (
      process.pid === "" ||
      process.arrivalTime === "" ||
      process.burstTime === ""
    ) {

      alert(
        "Please fill all required fields"
      );

      return;

    }

    
    if (
      selectedAlgorithm ===
        "priority" &&
      process.priority === ""
    ) {

      alert(
        "Please enter priority"
      );

      return;

    }

    
    const newProcess = {

      pid: process.pid,

      arrivalTime:
        Number(process.arrivalTime),

      burstTime:
        Number(process.burstTime),


      ...(selectedAlgorithm ===
        "priority" && {

          priority:
            Number(process.priority)

      })

    };

    
    setProcesses([
      ...processes,
      newProcess
    ]);

    // Reset form
    setProcess({

      pid: "",
      arrivalTime: "",
      burstTime: "",
      priority: ""

    });

  };

 

  const deleteProcess = (index) => {

    const updatedProcesses =
      processes.filter(
        (_, i) => i !== index
      );

    setProcesses(updatedProcesses);

  };


  const runSimulation = () => {

    if (processes.length === 0) {

      alert(
        "Please add processes"
      );

      return;

    }

   
    if (
      selectedAlgorithm ===
        "rr" &&
      timeQuantum === ""
    ) {

      alert(
        "Please enter Time Quantum"
      );

      return;

    }

    
    onSimulate({

      algorithm:
        selectedAlgorithm,

      timeQuantum:
        Number(timeQuantum),

      processes

    });

  };

  

  return (

    <div className="process-form">

      <h2>
        CPU Scheduling Simulator
      </h2>

      

      <div className="algorithm-select">

        <label>
          Select Algorithm
        </label>

        <select
          value={selectedAlgorithm}
          onChange={(e) =>
            setSelectedAlgorithm(
              e.target.value
            )
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

      </div>

      

      <div className="input-group">

        {/* PID */}

        <input
          type="text"
          name="pid"
          placeholder="Process ID"
          value={process.pid}
          onChange={handleChange}
        />

        {/* Arrival Time */}

        <input
          type="number"
          name="arrivalTime"
          placeholder="Arrival Time"
          value={process.arrivalTime}
          onChange={handleChange}
        />

        {/* Burst Time */}

        <input
          type="number"
          name="burstTime"
          placeholder="Burst Time"
          value={process.burstTime}
          onChange={handleChange}
        />

        {/* Priority Field */}

        {
          selectedAlgorithm ===
            "priority" && (

            <input
              type="number"
              name="priority"
              placeholder="Priority"
              value={process.priority}
              onChange={handleChange}
            />

          )
        }

      </div>

      

      {
        selectedAlgorithm ===
          "rr" && (

          <div className="rr-input">

            <input
              type="number"
              placeholder="Time Quantum"
              value={timeQuantum}
              onChange={(e) =>
                setTimeQuantum(
                  e.target.value
                )
              }
            />

          </div>

        )
      }

      

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

      

      {
        processes.length > 0 && (

          <div className="table-container">

            <h3>
              Process Queue
            </h3>

            <table>

              <thead>

                <tr>

                  <th>
                    PID
                  </th>

                  <th>
                    Arrival
                  </th>

                  <th>
                    Burst
                  </th>

                  

                  {
                    selectedAlgorithm ===
                      "priority" && (

                      <th>
                        Priority
                      </th>

                    )
                  }

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

                        

                        {
                          selectedAlgorithm ===
                            "priority" && (

                            <td>
                              {p.priority}
                            </td>

                          )
                        }

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