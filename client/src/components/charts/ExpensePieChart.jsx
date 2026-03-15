import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function ExpensePieChart({ data }) {
  const COLORS = ["#3b82f6", "#8b5cf6", "#ef4444"];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}