const express = require("express");
const router = express.Router();


const fcfs = require("../algorithms/fcfs");


const sjf = require("../algorithms/sjf");


const srjf = require("../algorithms/srjf");


const roundRobin = require("../algorithms/roundRobin");


const priorityScheduling = require("../algorithms/priorityScheduling");

const compareAlgorithms =
  require("../services/compareAlgorithms");



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



router.post("/srjf", (req, res) => {

  try {

    const { processes } = req.body;

    // CHECK EMPTY
    if (!processes || processes.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Processes data is required"
      });

    }

    // VALIDATION
    const invalid = processes.some(

      p =>

        p.arrivalTime == null ||
        p.burstTime == null

    );

    if (invalid) {

      return res.status(400).json({

        success: false,

        message:
          "arrivalTime and burstTime required"

      });

    }

    // RUN ALGORITHM
    const output = srjf(processes);

    // RESPONSE
    return res.status(200).json({

      success: true,

      algorithm: "SRJF",

      ...output

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: "Server Error",

      error: error.message

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


router.post("/rr", (req, res) => {

  try {

    const { processes, quantum } = req.body;

    // CHECK PROCESS LIST
    if (!processes || processes.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Processes required"
      });

    }

    // CHECK QUANTUM
    if (!quantum || quantum <= 0) {

      return res.status(400).json({
        success: false,
        message: "Valid quantum required"
      });

    }

    // RUN ALGORITHM
    const output =
      roundRobin(processes, quantum);

    return res.status(200).json({

      success: true,

      algorithm: "Round Robin",

      quantum,

      ...output

    });

  }

  catch (error) {

    return res.status(500).json({

      success: false,

      message: "Server Error",

      error: error.message

    });

  }

});
module.exports = router;