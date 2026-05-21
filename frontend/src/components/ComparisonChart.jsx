import "./ComparisonChart.css";

import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer

} from "recharts";

const ComparisonChart = ({

  comparisonResult

}) => {

  return (

    <div className="chart-container">

      <h2 className="chart-title">

        Performance Comparison

      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <BarChart
          data={comparisonResult}
        >

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="algorithm"
          />

          <YAxis />

          <Tooltip />

          <Legend />

          {/* Avg Waiting Time */}

          <Bar
            dataKey="avgWaitingTime"
          />

          {/* Avg Turnaround Time */}

          <Bar
            dataKey="avgTurnaroundTime"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

};

export default ComparisonChart;