import React, { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function SeverityDonut() {
  const { totals } = useContext(DataContext);
  const data = [
    { name: "High", value: totals.high },
    { name: "Medium", value: totals.medium },
    { name: "Low", value: totals.low },
  ];
  const COLORS = ["#ef4444", "#f59e0b", "#10b981"];
  return (
    <div className="chart-panel">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80}>
            {data.map((d,i)=><Cell key={i} fill={COLORS[i%COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
