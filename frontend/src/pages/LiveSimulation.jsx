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


  const location =
    useLocation();

  const navigate =
    useNavigate();

  

  const {

    algorithm,

    processes,

    timeQuantum

  } = location.state || {};



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

  

  return (

    <div className="live-container">

     

      <h1 className="title">

        CPU Scheduling
        Live Simulation

      </h1>

     

      <h2 className="algo-name">

        Algorithm :
        {" "}

        {
          algorithm?.toUpperCase()
        }

      </h2>

      

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

      

      {
        loading && (

          <div className="loading">

            Loading Simulation...

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

      

      <div className="top-section">

        {/* CPU */}

        <CPUBox
          currentState=
            {currentState}
        />

        

        <ReadyQueue
          currentState=
            {currentState}
        />

      </div>

      

      <LiveGantt
        gantt={gantt}
      />

      

      <ProcessTable
        currentState=
          {currentState}
      />

    </div>

  );

}