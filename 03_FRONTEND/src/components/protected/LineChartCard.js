import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Aug', sales: 3000 },
  { name: 'Sep', sales: 3800 },
  { name: 'Oct', sales: 5200 },
  { name: 'Nov', sales: 4500 },
  { name: 'Dec', sales: 5500 },
  { name: 'Jan', sales: 7500 },
  { name: 'Feb', sales: 6000 },
  { name: 'Mar', sales: 5500 },
  { name: 'Apr', sales: 6500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 7000 },
  { name: 'Jul', sales: 7800 },
];

const LineChartCard = () => {
  return (
    <div className="chart-card-analytics">
      <h3>Sales Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#b0b0d0" />
          <YAxis stroke="#b0b0d0" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8c8cd9" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartCard;

