import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function MonthlyBarChart({ data }) {
  return (
    <BarChart width={500} height={300} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="amount" fill="#8b5cf6" />
    </BarChart>
  );
}