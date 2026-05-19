const express = require("express");

const router = express.Router();

// Import FCFS algorithm
const fcfs = require("../algorithms/fcfs");


// FCFS Route
// POST /api/schedule/fcfs

router.post("/fcfs", (req, res) => {

  try {

    // Extract processes from request body
    const { processes } = req.body;

    // Validate input
    if (!processes || processes.length === 0) {

      return res.status(400).json({
        message: "Processes data is required"
      });

    }

    // Execute FCFS scheduling
    const output = fcfs(processes);

    // Send response
    res.status(200).json(output);

  }

  catch (error) {

    res.status(500).json({
      message: "Server Error",
      error: error.message
    });

  }

});

module.exports = router;