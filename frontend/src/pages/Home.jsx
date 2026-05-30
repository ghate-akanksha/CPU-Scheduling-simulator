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

  const navigate = useNavigate();

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



  // ================= RUN SIMULATION =================

  const handleSimulation =
    async (simulationData) => {

      try {

        setLoading(true);

        setError("");

        setResult(null);

        // STORE PROCESS DATA
        setProcessData(
          simulationData.processes
        );
        console.log(
  "Simulation Algorithm:",
  simulationData.algorithm
);

        // STORE TIME QUANTUM
        if (
          simulationData.timeQuantum
        ) {

          setTimeQuantum(
            simulationData.timeQuantum
          );

        }

        // ================= ROUTE MAP =================

        const routeMap = {

          fcfs: "fcfs",

          sjf: "sjf",

          srjf: "srjf",

          srtf: "srjf",

          rr: "rr",

          roundRobin: "rr",

          priority: "priority"

        };

        console.log(
  "Simulation Algorithm:",
  simulationData.algorithm
);

const endpoint =
  routeMap[
    simulationData.algorithm
  ] || "fcfs";


        // ================= REQUEST DATA =================

        const requestData = {

          processes:
            simulationData.processes

        };



        // RR NEEDS QUANTUM
        if (endpoint === "rr") {

          requestData.quantum =

            simulationData.timeQuantum ||

            timeQuantum;

        }



        // PRIORITY NEEDS PRIORITY FIELD
        if (endpoint === "priority") {

          requestData.processes =
            simulationData.processes;

        }



        // ================= API CALL =================

        const response =
          await axios.post(

            `http://localhost:5000/api/schedule/${endpoint}`,

            requestData

          );



        // ================= STORE RESULT =================

        setResult(response.data);

      }

      catch (err) {

        console.log(err);

        console.log(err.response?.data);

        setError(
          err.response?.data?.message ||
          "Failed to run simulation"
        );

      }

      finally {

        setLoading(false);

      }

    };



  // ================= COMPARE ALGORITHMS =================

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

              quantum:
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



  // ================= LIVE SIMULATION =================

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

    console.log(
      "Algorithm Before Navigation:",
      algorithm
    );

    console.log(
      "Process Data:",
      processData
    );

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

  // ================= UI =================

  return (

    <div className="home">

      {/* NAVBAR */}

      <div className="navbar">

        <h1 className="logo">

          CPU Scheduling Simulator

        </h1>

      </div>



      {/* HERO */}

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



      {/* MAIN CONTAINER */}

      <div className="main-container">



        {/* LEFT PANEL */}

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



          {/* RR SETTINGS */}

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



          {/* COMPARE BUTTON */}

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



        {/* RIGHT PANEL */}

        <div className="right-panel">



          {/* LOADING */}

          {
            loading && (

              <div className="loading">

                Running Simulation...

              </div>

            )
          }



          {/* ERROR */}

          {
            error && (

              <div className="error">

                {error}

              </div>

            )
          }



          {/* RESULT */}

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



                {/* LIVE BUTTON */}

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



          {/* COMPARISON RESULT */}

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