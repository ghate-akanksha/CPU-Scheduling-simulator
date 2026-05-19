import "./Home.css";

import { useState } from "react";
import axios from "axios";

import ProcessForm from "../components/ProcessForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import MetricsTable from "../components/MetricsTable";
import GanttChart from "../components/GanttChart";

const Home = () => {

  // =========================
  // States
  // =========================

  const [algorithm, setAlgorithm] =
    useState("fcfs");

  const [result, setResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // Run Simulation
  // =========================

  const handleSimulation =
    async (processes) => {

      try {

        setLoading(true);

        setError("");

        setResult(null);

        const response =
          await axios.post(
            `http://localhost:5000/api/schedule/${algorithm}`,
            {
              processes
            }
          );

        setResult(response.data);

      } catch (err) {

        console.log(err);

        setError(
          "Failed to run simulation"
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div className="home">

      {/* ========================= */}
      {/* Navbar */}
      {/* ========================= */}

      <div className="navbar">

        <h1 className="logo">
          CPU Scheduling Simulator
        </h1>

      </div>

      {/* ========================= */}
      {/* Hero Section */}
      {/* ========================= */}

      <div className="hero">

        <h2>
          Interactive Operating System
          Scheduling Visualizer
        </h2>

        <p>
          Simulate FCFS, SJF, SRTF,
          Round Robin and Priority
          Scheduling Algorithms.
        </p>

      </div>

      {/* ========================= */}
      {/* Main Layout */}
      {/* ========================= */}

      <div className="main-container">

        {/* Left Panel */}

        <div className="left-panel">

          <div className="card">

            <AlgorithmSelector
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />

          </div>

          <div className="card">

            <ProcessForm
              onSimulate={
                handleSimulation
              }
            />

          </div>

        </div>

        {/* Right Panel */}

        <div className="right-panel">

          {
            loading && (

              <div className="loading">

                Running Simulation...

              </div>

            )
          }

          {
            error && (

              <div className="error">

                {error}

              </div>

            )
          }

          {
            result && (
              <>

                <div className="card">

                  <MetricsTable
                    result={result}
                  />

                </div>

                <div className="card">

                  <GanttChart
                    gantt={
                      result.ganttChart
                    }
                  />

                </div>

              </>
            )
          }

        </div>

      </div>

    </div>
  );
};

export default Home;