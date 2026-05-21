const express = require("express");
const router = express.Router();

// Import FCFS algorithm
const fcfs = require("../algorithms/fcfs");

// Import SJF algorithm
const sjf = require("../algorithms/sjf");

// Import SRJF algorithm 
const srjf = require("../algorithms/srjf");

// import round robin algorithm
const roundRobin = require("../algorithms/roundRobin");

// import  priority scheduling algorithm
const priorityScheduling = require("../algorithms/priorityScheduling");
// import compare algorithms
const compareAlgorithms =
  require("../services/compareAlgorithms");


// ================= FCFS =================
router.post("/fcfs", (req, res) => {
  try {
    const { processes } = req.body;

    if (!processes || processes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Processes data is required"
      });
    }

    const output = fcfs(processes);

    return res.status(200).json({
      success: true,
      algorithm: "FCFS",
      ...output
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});


// ================= SJF =================
router.post("/sjf", (req, res) => {
  try {
    const { processes } = req.body;

    if (!processes || processes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Processes data is required"
      });
    }

    const output = sjf(processes);

    return res.status(200).json({
      success: true,
      algorithm: "SJF",
      ...output
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});


// ================= SRJF (SRTF) =================
router.post("/srjf", (req, res) => {
  try {
    const { processes } = req.body;

    if (!processes || processes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Processes data is required"
      });
    }

    const output = srjf(processes);

    return res.status(200).json({
      success: true,
      algorithm: "SRJF",
      ...output
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

// ====== round robin ========
router.post("/rr", (req, res) => {
  try {

    const { processes, quantum } = req.body;

    if (!processes || processes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Processes required"
      });
    }

    const output = roundRobin(processes, quantum || 2);

    return res.json({
      success: true,
      algorithm: "Round Robin",
      ...output
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Priority Route
router.post("/priority", (req, res) => {

  try {

    const { processes } = req.body;

    if (!processes || processes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Processes required"
      });
    }

    const output = priorityScheduling(processes);

    return res.json({
      success: true,
      algorithm: "Priority Scheduling",
      ...output
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

});

router.post(
  "/compare",

  (req, res) => {

    try {

      const { processes } =
        req.body;

      if (
        !processes ||
        processes.length === 0
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Processes required"

        });

      }

      const result =
        compareAlgorithms(
          processes
        );

      return res.json(result);

    }

    catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

  }

);

// ================= EXPORT =================
module.exports = router;