import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Electronics', value: 31, color: '#8c8cd9' },
  { name: 'Laptop', value: 22, color: '#6a0572' },
  { name: 'Home Appliance', value: 19, color: '#f73859' },
  { name: 'Mobiles', value: 15, color: '#1de9b6' },
  { name: 'Music Appliance', value: 13, color: '#ffc107' },
];

const CustomLegend = () => {
  return (
    <div className="chart-legend">
      {data.map((entry, index) => (
        <div key={`item-${index}`} className="legend-item">
          <span className="legend-color-box" style={{ backgroundColor: entry.color }}></span>
          {entry.name} {entry.value}%
        </div>
      ))}
    </div>
  );
};

const BarChartCard = () => {
  return (
    <div className="chart-card-analytics">
      <h3>Category Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;

