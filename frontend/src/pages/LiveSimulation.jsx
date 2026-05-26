import "./LiveSimulation.css";

import {
  useEffect,
  useState
} from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import axios from "axios";

// COMPONENTS

import CPUBox
from "../components/CPUBox";

import ReadyQueue
from "../components/ReadyQueue";

import LiveGantt
from "../components/LiveGantt";

import SimulationControls
from "../components/SimulationControls";

import ProcessTable
from "../components/ProcessTable";

export default function
LiveSimulation() {

  // =========================
  // NAVIGATION
  // =========================

  const location =
    useLocation();

  const navigate =
    useNavigate();

  // =========================
  // GET DATA FROM HOME
  // =========================

  const {

    algorithm,

    processes,

    timeQuantum

  } = location.state || {};

  // =========================
  // STATES
  // =========================

  const [timeline,
    setTimeline] =
    useState([]);

  const [currentIndex,
    setCurrentIndex] =
    useState(0);

  const [currentState,
    setCurrentState] =
    useState(null);

  const [isPlaying,
    setIsPlaying] =
    useState(false);

  const [speed,
    setSpeed] =
    useState(1000);

  const [gantt,
    setGantt] =
    useState([]);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  // =========================
  // API MAP
  // =========================

  const apiMap = {

    fcfs:
      "fcfs",

    sjf:
      "sjf",

    srjf:
      "srjf",

    roundRobin:
      "roundRobin",

    priority:
      "priorityScheduling"

  };

  // =========================
  // FETCH TIMELINE
  // =========================

  useEffect(() => {

    // Prevent crash

    if (
      !algorithm ||
      !processes
    ) {

      navigate("/");

      return;

    }

    fetchTimeline();

  }, []);

  // =========================
  // FETCH FUNCTION
  // =========================

  const fetchTimeline =
    async () => {

      try {

        setLoading(true);

        setError("");

        const endpoint =
          apiMap[algorithm];

        let response;

        // ROUND ROBIN

        if (
          algorithm ===
          "roundRobin"
        ) {

          response =
            await axios.post(

              `http://localhost:5000/api/live/${endpoint}`,

              {

                processes,

                timeQuantum

              }

            );

        }

        // OTHER ALGORITHMS

        else {

          response =
            await axios.post(

              `http://localhost:5000/api/live/${endpoint}`,

              {

                processes

              }

            );

        }

        setTimeline(
          response.data
        );

      }

      catch (error) {

        console.log(error);

        setError(
          "Failed to load simulation"
        );

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // LIVE ENGINE
  // =========================

  useEffect(() => {

    let interval;

    if (

      isPlaying &&

      currentIndex <
        timeline.length

    ) {

      interval =
        setInterval(() => {

          const state =
            timeline[
              currentIndex
            ];

          setCurrentState(
            state
          );

          // LIVE GANTT UPDATE

          setGantt((prev) => [

            ...prev,

            state.running

          ]);

          // NEXT STEP

          setCurrentIndex(
            (prev) =>
              prev + 1
          );

        }, speed);

    }

    // CLEAR INTERVAL

    return () =>
      clearInterval(interval);

  }, [

    isPlaying,

    currentIndex,

    timeline,

    speed

  ]);

  // =========================
  // CONTROLS
  // =========================

  const handleStart = () => {

    setIsPlaying(true);

  };

  const handlePause = () => {

    setIsPlaying(false);

  };

  const handleReset = () => {

    setIsPlaying(false);

    setCurrentIndex(0);

    setCurrentState(null);

    setGantt([]);

  };

  // =========================
  // JSX
  // =========================

  return (

    <div className="live-container">

      {/* ========================= */}
      {/* TITLE */}
      {/* ========================= */}

      <h1 className="title">

        CPU Scheduling
        Live Simulation

      </h1>

      {/* ========================= */}
      {/* ALGORITHM */}
      {/* ========================= */}

      <h2 className="algo-name">

        Algorithm :
        {" "}

        {
          algorithm?.toUpperCase()
        }

      </h2>

      {/* ========================= */}
      {/* CONTROLS */}
      {/* ========================= */}

      <SimulationControls

        handleStart=
          {handleStart}

        handlePause=
          {handlePause}

        handleReset=
          {handleReset}

        speed={speed}

        setSpeed=
          {setSpeed}

      />

      {/* ========================= */}
      {/* LOADING */}
      {/* ========================= */}

      {
        loading && (

          <div className="loading">

            Loading Simulation...

          </div>

        )
      }

      {/* ========================= */}
      {/* ERROR */}
      {/* ========================= */}

      {
        error && (

          <div className="error">

            {error}

          </div>

        )
      }

      {/* ========================= */}
      {/* TOP SECTION */}
      {/* ========================= */}

      <div className="top-section">

        {/* CPU */}

        <CPUBox
          currentState=
            {currentState}
        />

        {/* READY QUEUE */}

        <ReadyQueue
          currentState=
            {currentState}
        />

      </div>

      {/* ========================= */}
      {/* GANTT */}
      {/* ========================= */}

      <LiveGantt
        gantt={gantt}
      />

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}

      <ProcessTable
        currentState=
          {currentState}
      />

    </div>

  );

}