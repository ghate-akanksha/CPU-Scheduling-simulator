const runSimulation =
  require("../services/liveSimulationEngine");

const simulate = (req, res) => {

  try {

    console.log(
      "LIVE REQUEST:",
      req.body
    );

    let {
      algorithm,
      processes,
      timeQuantum,
      quantum
    } = req.body;

    // ================= VALIDATION =================

    if (!algorithm) {

      return res.status(400).json({

        success: false,
        message: "Algorithm required"

      });

    }

    if (
      !processes ||
      !Array.isArray(processes) ||
      processes.length === 0
    ) {

      return res.status(400).json({

        success: false,
        message: "Processes required"

      });

    }

    // ================= ALGORITHM NORMALIZATION =================

    algorithm =
      algorithm.toLowerCase();

    const algorithmMap = {

      fcfs: "fcfs",

      sjf: "sjf",

      srjf: "srjf",

      srtf: "srjf",

      rr: "rr",

      roundrobin: "rr",

      priority: "priority"

    };

    algorithm =
      algorithmMap[algorithm];

    if (!algorithm) {

      return res.status(400).json({

        success: false,
        message: "Invalid algorithm"

      });

    }

    // ================= QUANTUM =================

    const rrQuantum =
      Number(
        timeQuantum ||
        quantum ||
        2
      );

    console.log(
      "NORMALIZED ALGORITHM:",
      algorithm
    );

    // ================= RUN ENGINE =================

    const result =
      runSimulation(

        algorithm,

        {

          processes,

          timeQuantum:
            rrQuantum

        }

      );

    return res.status(200).json(result);

  }

  catch (error) {

  console.error(
    "SIMULATION ERROR"
  );

  console.error(
    error.stack
  );

  res.status(500).json({

    success: false,

    message:
      error.message,

    stack:
      error.stack

  });

}

};

module.exports = {
  simulate
};