const express = require("express");
const router = express.Router();

// Import FCFS algorithm
const fcfs = require("../algorithms/fcfs");

// Import SJF algorithm
const sjf = require("../algorithms/sjf");

// Import SRJF algorithm (your file name)
const srjf = require("../algorithms/srjf");


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


// ================= EXPORT =================
module.exports = router;