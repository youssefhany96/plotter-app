import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

const CustomLineChart = ({ data, dimension, measures }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dimension}>
          <Label value={dimension} offset={0} position="insideBottom" />
        </XAxis>
        <YAxis
          label={{ value: measures[0], angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="linear"
          dataKey={measures[0]}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
