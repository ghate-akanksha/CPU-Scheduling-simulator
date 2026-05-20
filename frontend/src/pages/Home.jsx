import "./Home.css";

import { useState } from "react";

import axios from "axios";

import ProcessForm from "../components/ProcessForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import MetricsTable from "../components/MetricsTable";
import GanttChart from "../components/GanttChart";

const Home = () => {

  // =========================
  // STATES
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
  // RUN SIMULATION
  // =========================

  const handleSimulation =
    async (simulationData) => {

      try {

        setLoading(true);

        setError("");

        setResult(null);

        // =========================
        // API CALL
        // =========================

        const response =
          await axios.post(

            `http://localhost:5000/api/schedule/${simulationData.algorithm}`,

            simulationData

          );

        // Store Result
        setResult(response.data);

      }

      catch (err) {

        console.log(err);

        setError(
          "Failed to run simulation"
        );

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // JSX
  // =========================

  return (

    <div className="home">

      {/* ========================= */}
      {/* NAVBAR */}
      {/* ========================= */}

      <div className="navbar">

        <h1 className="logo">

          CPU Scheduling Simulator

        </h1>

      </div>

      {/* ========================= */}
      {/* HERO SECTION */}
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
      {/* MAIN LAYOUT */}
      {/* ========================= */}

      <div className="main-container">

        {/* ========================= */}
        {/* LEFT PANEL */}
        {/* ========================= */}

        <div className="left-panel">

          {/* Algorithm Selector */}

          <div className="card">

            <AlgorithmSelector
              algorithm={algorithm}
              setAlgorithm={setAlgorithm}
            />

          </div>

          {/* Process Form */}

          <div className="card">

            <ProcessForm
              algorithm={algorithm}
              onSimulate={
                handleSimulation
              }
            />

          </div>

        </div>

        {/* ========================= */}
        {/* RIGHT PANEL */}
        {/* ========================= */}

        <div className="right-panel">

          {/* Loading */}

          {
            loading && (

              <div className="loading">

                Running Simulation...

              </div>

            )
          }

          {/* Error */}

          {
            error && (

              <div className="error">

                {error}

              </div>

            )
          }

          {/* Result */}

          {
            result && (

              <>

                {/* Metrics Table */}

                <div className="card">

                  <MetricsTable
                    result={result}
                  />

                </div>

                {/* Gantt Chart */}

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