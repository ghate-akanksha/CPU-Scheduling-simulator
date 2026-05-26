const express =
  require("express");

const router =
  express.Router();

const simulateFCFS =
  require("../liveSimulation/fcfsLive");

const simulateSJF =
  require("../liveSimulation/sjfLive");

const simulateSRJF =
  require("../liveSimulation/srjfLive");

const simulateRR =
  require("../liveSimulation/rrLive");

const simulatePriority =
  require("../liveSimulation/priorityLive");


// =========================
// FCFS LIVE
// =========================

router.post(
  "/fcfs",
  (req, res) => {

    const { processes } =
      req.body;

    const result =
      simulateFCFS(
        processes
      );

    res.json(result);

  }
);


// =========================
// SJF LIVE
// =========================

router.post(
  "/sjf",
  (req, res) => {

    const { processes } =
      req.body;

    const result =
      simulateSJF(
        processes
      );

    res.json(result);

  }
);


// =========================
// SRJF LIVE
// =========================

router.post(
  "/srjf",
  (req, res) => {

    const { processes } =
      req.body;

    const result =
      simulateSRJF(
        processes
      );

    res.json(result);

  }
);


// =========================
// ROUND ROBIN LIVE
// =========================

router.post(
  "/roundRobin",
  (req, res) => {

    const {
      processes,
      timeQuantum
    } = req.body;

    const result =
      simulateRR(
        processes,
        timeQuantum
      );

    res.json(result);

  }
);


// =========================
// PRIORITY LIVE
// =========================

router.post(
  "/priorityScheduling",
  (req, res) => {

    const { processes } =
      req.body;

    const result =
      simulatePriority(
        processes
      );

    res.json(result);

  }
);

module.exports =
  router;