const express =
  require("express");

const router =
  express.Router();

const {
  simulate
} = require(
  "../controllers/liveSimulationController"
);


// =====================================
// UNIVERSAL LIVE SIMULATION ROUTE
// =====================================

router.post(
  "/simulate",
  simulate
);


module.exports =
  router;