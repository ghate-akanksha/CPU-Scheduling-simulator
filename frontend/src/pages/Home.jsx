import "./Home.css";

import { useState } from "react";

import axios from "axios";

import ProcessForm from "../components/ProcessForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import MetricsTable from "../components/MetricsTable";
import GanttChart from "../components/GanttChart";
import ComparisonTable
from "../components/ComparisonTable";
import ComparisonChart
from "../components/ComparisonChart";
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

  // Store Process Data Globally

  const [processData,
    setProcessData] =
    useState([]);

  // Comparison Result

  const [comparisonResult,
    setComparisonResult] =
    useState(null);

  // Best Algorithm

  const [bestAlgorithm,
    setBestAlgorithm] =
    useState("");

  // Round Robin Time Quantum
  // for comparison feature

  const [timeQuantum,
    setTimeQuantum] =
    useState(2);

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
        // STORE PROCESS DATA
        // =========================

        setProcessData(
          simulationData.processes
        );

        // =========================
        // STORE RR QUANTUM
        // =========================

        if (
          simulationData.timeQuantum
        ) {

          setTimeQuantum(
            simulationData.timeQuantum
          );

        }

        // =========================
        // API CALL
        // =========================

        const response =
          await axios.post(

            `http://localhost:5000/api/schedule/${simulationData.algorithm}`,

            simulationData

          );

        // =========================
        // STORE RESULT
        // =========================

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
  // COMPARE ALGORITHMS
  // =========================

  const compareAlgorithms =
    async () => {

      try {

        setLoading(true);

        setError("");

        setComparisonResult(null);

        // =========================
        // COMPARE API CALL
        // =========================

        const response =
          await axios.post(

            "http://localhost:5000/api/schedule/compare",

            {
              processes:
                processData,

              timeQuantum:
                timeQuantum
            }

          );

        // =========================
        // STORE COMPARISON RESULT
        // =========================

        setComparisonResult(
          response.data.comparisons
        );

        // =========================
        // STORE BEST ALGORITHM
        // =========================

        setBestAlgorithm(
          response.data.bestAlgorithm
        );

      }

      catch (error) {

        console.log(error);

        setError(
          "Comparison failed"
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

          Simulate FCFS, SJF, SRJF,
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

          {/* ========================= */}
          {/* COMPARISON SETTINGS */}
          {/* ========================= */}

          {
            processData.length > 0 && (

              <div className="card">

                <h3>

                  Comparison Settings

                </h3>

                <label>

                  Round Robin Time Quantum

                </label>

                <input
                  type="number"

                  min="1"

                  value={
                    timeQuantum
                  }

                  onChange={(e) =>
                    setTimeQuantum(
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            )
          }

          {/* ========================= */}
          {/* COMPARE BUTTON */}
          {/* ========================= */}

         {
  processData.length > 0 && (

    <div className="compare-section">

      <button
        className="compare-btn"

        onClick={
          compareAlgorithms
        }
      >

        Compare Algorithms

      </button>

    </div>

  )
}

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

          {/* ========================= */}
          {/* RESULT */}
          {/* ========================= */}

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

          
{/* ========================= */}
{/* COMPARISON RESULT */}
{/* ========================= */}

{
  comparisonResult && (

    <>

      {/* Comparison Table */}

      <div className="card">

        <ComparisonTable
          comparisonResult={
            comparisonResult
          }

          bestAlgorithm={
            bestAlgorithm
          }
        />

      </div>

      {/* Comparison Chart */}

      <div className="card">

        <ComparisonChart
          comparisonResult={
            comparisonResult
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