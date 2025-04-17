import React from "react";
import { getStatName } from "@/utils/helper-functions";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";

export default function StatsChart({
  stats,
  elColour,
  darkMode,
}: {
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  elColour: string;
  darkMode: boolean;
}) {
  const data = stats.map((stat) => ({
    name: getStatName(stat.stat.name),
    value: stat.base_stat,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" domain={[0, 255]} hide />
        <YAxis
          dataKey="name"
          type="category"
          axisLine={false}
          tickLine={false}
          width={120}
          tick={{ fill: darkMode ? "#E5E7EB" : "#374151" }}
        />
        <Bar dataKey="value" fill={elColour} barSize={10}>
          <LabelList
            dataKey="value"
            position="right"
            fill={darkMode ? "#E5E7EB" : "#374151"}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
