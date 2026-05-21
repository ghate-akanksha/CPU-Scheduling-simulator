import "./ComparisonTable.css";

const ComparisonTable = ({

  comparisonResult,

  bestAlgorithm

}) => {

  return (

    <div className="comparison-container">

      <h2 className="comparison-title">

        Algorithm Comparison

      </h2>

      <h3 className="best-algo">

        🏆 Best Algorithm:
        {" "}
        {bestAlgorithm}

      </h3>

      <table className="comparison-table">

        <thead>

          <tr>

            <th>
              Algorithm
            </th>

            <th>
              Avg WT
            </th>

            <th>
              Avg TAT
            </th>

          </tr>

        </thead>

        <tbody>

          {
            comparisonResult.map(
              (
                item,
                index
              ) => (

                <tr key={index}>

                  <td>
                    {
                      item.algorithm
                    }
                  </td>

                  <td>
                    {
                      item.avgWaitingTime
                    }
                  </td>

                  <td>
                    {
                      item.avgTurnaroundTime
                    }
                  </td>

                </tr>

              )
            )
          }

        </tbody>

      </table>

    </div>

  );

};

export default ComparisonTable;