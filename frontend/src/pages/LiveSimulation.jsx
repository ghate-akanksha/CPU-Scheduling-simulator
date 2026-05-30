import "./LiveSimulation.css";

import { useEffect, useState } from "react";

import {
  useLocation,
  useNavigate
} from "react-router-dom";

import CPUBox from "../components/CPUBox";
import ReadyQueue from "../components/ReadyQueue";
import LiveGantt from "../components/LiveGantt";
import TimelineControls from "../components/TimelineControls";
import ProcessTable from "../components/ProcessTable";
import SimulationStats from "../components/SimulationStats";

import {
  fetchSimulation
} from "../services/simulationApi";

import {
  generateGanttChart
} from "../utils/ganttUtils";

export default function LiveSimulation() {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    algorithm,
    processes,
    timeQuantum
  } = location.state || {};

  const [timeline, setTimeline] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const currentState = timeline[currentIndex];

  const gantt = generateGanttChart(
    timeline.slice(0, currentIndex + 1)
  );

  useEffect(() => {

  if (!algorithm || !processes) {
    navigate("/");
    return;
  }

  fetchTimeline();

}, [
  algorithm,
  processes,
  timeQuantum
]);

 const fetchTimeline = async () => {

  try {

    setLoading(true);
    setError("");

    setTimeline([]);
    setCurrentIndex(0);

    const data =
      await fetchSimulation({

        algorithm,
        processes,
        timeQuantum

      });

    console.log(
      "Timeline Data:",
      data
    );

    setTimeline(data);

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
      currentIndex < timeline.length - 1
    ) {

      interval =
        setInterval(() => {

          setCurrentIndex(
            prev => prev + 1
          );

        }, speed);

    }

    return () =>
      clearInterval(interval);

  }, [

    isPlaying,
    currentIndex,
    timeline,
    speed

  ]);
useEffect(() => {

  if (
    currentIndex >=
    timeline.length - 1
  ) {

    setIsPlaying(false);

  }

}, [
  currentIndex,
  timeline.length
]);
  const nextStep = () => {

    if (
      currentIndex <
      timeline.length - 1
    ) {

      setCurrentIndex(
        prev => prev + 1
      );

    }

  };

  const prevStep = () => {

    if (currentIndex > 0) {

      setCurrentIndex(
        prev => prev - 1
      );

    }

  };

  const resetSimulation = () => {

    setIsPlaying(false);
    setCurrentIndex(0);

  };

  return (

    <div className="live-container">

      <div className="hero-section">

        <h1 className="main-title">
          CPU Scheduling Simulator
        </h1>

        <div className="algorithm-badge">

          {algorithm?.toUpperCase()}

        </div>

      </div>

      <TimelineControls

        isPlaying={isPlaying}

        setIsPlaying={setIsPlaying}

        nextStep={nextStep}

        prevStep={prevStep}

        resetSimulation={resetSimulation}

        speed={speed}

        setSpeed={setSpeed}

        currentIndex={currentIndex}

        totalSteps={timeline.length}

      />

      {loading && (

        <div className="loading-box">

          Loading Simulation...

        </div>

      )}

      {error && (

        <div className="error-box">

          {error}

        </div>

      )}

      <SimulationStats

        currentState={currentState}

        algorithm={algorithm}

        totalProcesses={processes.length}

        completedCount={
          currentState
            ?.completed
            ?.length || 0
        }

      />

      <div className="simulation-grid">

        <div className="card">

          <h2 className="section-title">
            CPU State
          </h2>

          <CPUBox
            currentState={currentState}
          />

        </div>

        <div className="card">

          <h2 className="section-title">
            Ready Queue
          </h2>

          <ReadyQueue
            currentState={currentState}
          />

        </div>

      </div>

      <div className="card">

        <h2 className="section-title">
          Gantt Chart
        </h2>

        <LiveGantt gantt={gantt} />

      </div>

      <div className="card">

        <h2 className="section-title">
          Process Table
        </h2>

        <ProcessTable

          processes={processes}

          currentState={currentState}

        />

      </div>

    </div>

  );

}