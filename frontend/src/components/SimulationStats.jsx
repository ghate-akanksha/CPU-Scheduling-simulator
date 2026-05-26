import "./SimulationStats.css";

const SimulationStats = ({
  time,
  algorithm
}) => {

  return (

    <div className="stats-box">

      <div className="stat-card">

        <h3>

          Current Time

        </h3>

        <h1>

          {time}

        </h1>

      </div>

      <div className="stat-card">

        <h3>

          Algorithm

        </h3>

        <h1>

          {
            algorithm
              ?.toUpperCase()
          }

        </h1>

      </div>

    </div>

  );

};

export default SimulationStats;