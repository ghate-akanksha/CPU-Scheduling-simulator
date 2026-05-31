const fcfsLive =
  require("../liveSimulation/fcfsLive");

const sjfLive =
  require("../liveSimulation/sjfLive");

const srjfLive =
  require("../liveSimulation/srjfLive");

const rrLive =
  require("../liveSimulation/rrLive");

const priorityLive =
  require("../liveSimulation/priorityLive");



const algorithmMap = {

  fcfs: fcfsLive,

  sjf: sjfLive,

  srjf: srjfLive,

  rr: rrLive,

  roundRobin: rrLive,

  priority: priorityLive

};



const runSimulation = (
  algorithm,
  data
) => {

  console.log(
    "Requested Algorithm:",
    algorithm
  );

  const simulator =
    algorithmMap[algorithm];

  console.log(
    "Simulator Found:",
    !!simulator
  );

  // INVALID ALGORITHM

  if (!simulator) {

    throw new Error(
      `Invalid Algorithm: ${algorithm}`
    );

  }

  // ROUND ROBIN

  if (
    algorithm === "rr" ||
    algorithm === "roundRobin"
  ) {

    return simulator(

      data.processes,

      data.timeQuantum || 2

    );

  }


  return simulator(
    data.processes
  );

};

module.exports =
  runSimulation;