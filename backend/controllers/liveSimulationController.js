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

  let timeline = [];

if (algorithm === "fcfs") {

  timeline =
    fcfsLive(processes);

}

else if (
  algorithm === "sjf"
) {

  timeline =
    sjfLive(processes);

}

else if (
  algorithm === "srjf"
) {

  timeline =
    srjfLive(processes);

}

else if (
  algorithm === "roundRobin"
) {

  timeline =
    rrLive(
      processes,
      timeQuantum
    );

}

else if (
  algorithm === "priority"
) {

  timeline =
    priorityLive(processes);

}