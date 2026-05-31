const express =
  require("express");

const router =
  express.Router();

const {
  simulate
} = require(
  "../controllers/liveSimulationController"
);




router.post(
  "/simulate",
  simulate
);


module.exports =
  router;