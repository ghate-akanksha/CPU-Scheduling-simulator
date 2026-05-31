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



function compareAlgorithms(

  processes,

  timeQuantum

) {

  

  if (
    !timeQuantum ||
    timeQuantum <= 0
  ) {

    timeQuantum = 2;

  }

  

  console.log("FCFS START");

  const fcfsResult =
    fcfs([...processes]);

  console.log("FCFS DONE");

  

  console.log("SJF START");

  const sjfResult =
    sjf([...processes]);

  console.log("SJF DONE");

  

  console.log("SRJF START");

  const srjfResult =
    srjf([...processes]);

  console.log("SRJF DONE");

  

  console.log("RR START");

  const rrResult =
    roundRobin(

      [...processes],

      timeQuantum

    );

  console.log("RR DONE");

  

  console.log("PRIORITY START");

  const priorityResult =
    priorityScheduling(
      [...processes]
    );

  console.log("PRIORITY DONE");

 

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

  

  return {

    bestAlgorithm:
      bestAlgorithm.algorithm,

    comparisons

  };

}



module.exports =
  compareAlgorithms;