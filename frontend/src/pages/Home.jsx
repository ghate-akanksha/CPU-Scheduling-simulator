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

  

  const handleSimulation =
    async (simulationData) => {

      try {

        setLoading(true);

        setError("");

        setResult(null);

    

        setProcessData(
          simulationData.processes
        );

    

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

  

  return (

    <div className="home">

      

      <div className="navbar">

        <h1 className="logo">

          CPU Scheduling Simulator

        </h1>

      </div>


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

     

      <div className="main-container">


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