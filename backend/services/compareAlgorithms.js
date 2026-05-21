const fcfs =
  require("../algorithms/fcfs");

const sjf =
  require("../algorithms/sjf");

const srjf =
  require("../algorithms/srjf");

const roundRobin =
  require("../algorithms/roundRobin");

const priorityScheduling =
  require("../algorithms/priorityScheduling");

const calculateAverage =
  require("../utils/calculateAverage");

// =========================
// COMPARE ALL ALGORITHMS
// =========================

function compareAlgorithms(

  processes,

  timeQuantum

) {

  // =========================
  // SAFETY CHECK
  // =========================

  if (
    !timeQuantum ||
    timeQuantum <= 0
  ) {

    timeQuantum = 2;

  }

  // =========================
  // RUN FCFS
  // =========================

  console.log("FCFS START");

  const fcfsResult =
    fcfs([...processes]);

  console.log("FCFS DONE");

  // =========================
  // RUN SJF
  // =========================

  console.log("SJF START");

  const sjfResult =
    sjf([...processes]);

  console.log("SJF DONE");

  // =========================
  // RUN SRJF
  // =========================

  console.log("SRJF START");

  const srjfResult =
    srjf([...processes]);

  console.log("SRJF DONE");

  // =========================
  // RUN ROUND ROBIN
  // =========================

  console.log("RR START");

  const rrResult =
    roundRobin(

      [...processes],

      timeQuantum

    );

  console.log("RR DONE");

  // =========================
  // RUN PRIORITY
  // =========================

  console.log("PRIORITY START");

  const priorityResult =
    priorityScheduling(
      [...processes]
    );

  console.log("PRIORITY DONE");

  // =========================
  // CALCULATE AVERAGES
  // =========================

  const comparisons = [

    {
      algorithm: "FCFS",

      ...calculateAverage(
        fcfsResult
      )
    },

    {
      algorithm: "SJF",

      ...calculateAverage(
        sjfResult
      )
    },

    {
      algorithm: "SRJF",

      ...calculateAverage(
        srjfResult
      )
    },

    {
      algorithm:
        "Round Robin",

      ...calculateAverage(
        rrResult
      )
    },

    {
      algorithm:
        "Priority",

      ...calculateAverage(
        priorityResult
      )
    }

  ];

  // =========================
  // FIND BEST ALGORITHM
  // =========================

  let bestAlgorithm =
    comparisons[0];

  comparisons.forEach((algo) => {

    if (

      Number(
        algo.avgWaitingTime
      ) <

      Number(
        bestAlgorithm.avgWaitingTime
      )

    ) {

      bestAlgorithm = algo;

    }

  });

  // =========================
  // RETURN FINAL RESULT
  // =========================

  return {

    bestAlgorithm:
      bestAlgorithm.algorithm,

    comparisons

  };

}

// =========================
// EXPORT MODULE
// =========================

module.exports =
  compareAlgorithms;