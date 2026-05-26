import "./Home.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ProcessForm from "../components/ProcessForm";
import AlgorithmSelector from "../components/AlgorithmSelector";
import MetricsTable from "../components/MetricsTable";
import GanttChart from "../components/GanttChart";
import ComparisonTable from "../components/ComparisonTable";
import ComparisonChart from "../components/ComparisonChart";

const Home = () => {

  // =========================
  // NAVIGATION
  // =========================

  const navigate = useNavigate();

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

  const [processData,
    setProcessData] =
    useState([]);

  const [comparisonResult,
    setComparisonResult] =
    useState(null);

  const [bestAlgorithm,
    setBestAlgorithm] =
    useState("");

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

        // Store process data

        setProcessData(
          simulationData.processes
        );

        // Store RR Time Quantum

        if (
          simulationData.timeQuantum
        ) {

          setTimeQuantum(
            simulationData.timeQuantum
          );

        }

        // API CALL

        const response =
          await axios.post(

            `http://localhost:5000/api/schedule/${simulationData.algorithm}`,

            simulationData

          );

        // Store result

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

        setComparisonResult(
          response.data.comparisons
        );

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
  // START LIVE SIMULATION
  // =========================

  const startLiveSimulation =
    () => {

      if (
        processData.length === 0
      ) {

        alert(
          "Please run simulation first"
        );

        return;

      }

      navigate(
        "/live-simulation",

        {

          state: {

            algorithm,

            processes:
              processData,

            timeQuantum

          }

        }

      );

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

          Interactive Operating
          System Scheduling Visualizer

        </h2>

        <p>

          Simulate FCFS, SJF,
          SRJF, Round Robin and
          Priority Scheduling
          Algorithms.

        </p>

      </div>

      {/* ========================= */}
      {/* MAIN CONTAINER */}
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

          {/* RR Settings */}

          {
            processData.length > 0 && (

              <div className="card">

                <h3>

                  Comparison Settings

                </h3>

                <label>

                  Round Robin
                  Time Quantum

                </label>

                <input

                  type="number"

                  min="1"

                  value={timeQuantum}

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

          {/* Compare Button */}

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

                {/* Metrics */}

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

                {/* Live Simulation */}

                <div className="live-btn-container">

                  <button

                    className="live-btn"

                    onClick={
                      startLiveSimulation
                    }

                  >

                    Start Live Simulation

                  </button>

                </div>

              </>

            )
          }

          {/* ========================= */}
          {/* COMPARISON */}
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