import React from "react";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";
import { DollarSign, Users, ShoppingCart, Eye, TrendingUp, Box } from "lucide-react";

// Simple Card replacement
const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);
const CardContent = ({ children, className = "" }) => <div className={className}>{children}</div>;

// Dropdown for "This Quarter"
const TimePeriodDropdown = () => (
  <select className="time-period-dropdown">
    <option>This Quarter</option>
    <option>Last Quarter</option>
    <option>This Year</option>
    <option>Last Year</option>
  </select>
);

// Revenue vs Target Data
const revenueData = [
  { month: "Jan", revenue: 4000, target: 4500 },
  { month: "Feb", revenue: 3200, target: 4000 },
  { month: "Mar", revenue: 5000, target: 4800 },
  { month: "Apr", revenue: 4500, target: 4600 },
  { month: "May", revenue: 6000, target: 5800 },
  { month: "Jun", revenue: 5300, target: 5000 },
  { month: "Jul", revenue: 7000, target: 6500 },
];

// Channel Performance
const channelData = [
  { name: "Organic Search", value: 27 },
  { name: "Paid Search", value: 18 },
  { name: "Direct", value: 15 },
  { name: "Email", value: 14 },
  { name: "Social Media", value: 16 },
  { name: "Referral", value: 11 },
];

// New COLORS for Pie Chart to match target image (lighter, pastel-like)
const PIE_COLORS = ["#a78bfa", "#6ee7b7", "#fcd34d", "#f87171", "#818cf8", "#22d3ee"];

// Product Performance (Updated colors for bars to match target)
const productData = [
  { name: "Product A", sales: 3000, revenue: 2000, profit: 1500 },
  { name: "Product B", sales: 2000, revenue: 4000, profit: 2400 },
  { name: "Product C", sales: 4500, revenue: 5000, profit: 3000 },
  { name: "Product D", sales: 2500, revenue: 3200, profit: 2000 },
  { name: "Product E", sales: 3500, revenue: 2800, profit: 2200 },
];

// User Retention
const retentionData = [
  { week: "Week 1", retention: 100 },
  { week: "Week 2", retention: 75 },
  { week: "Week 3", retention: 55 },
  { week: "Week 4", retention: 45 },
  { week: "Week 5", retention: 35 },
  { week: "Week 6", retention: 28 },
  { week: "Week 7", retention: 20 },
  { week: "Week 8", retention: 15 }, // Added an extra week for more data points
];

// Customer Segmentation
const radarData = [
  { subject: "Engagement", A: 120, B: 110, fullMark: 150 },
  { subject: "Loyalty", A: 98, B: 130, fullMark: 150 },
  { subject: "Satisfaction", A: 86, B: 130, fullMark: 150 },
  { subject: "Spend", A: 99, B: 100, fullMark: 150 },
  { subject: "Frequency", A: 85, B: 90, fullMark: 150 },
  { subject: "Recency", A: 65, B: 85, fullMark: 150 },
];

// Custom label for Pie Chart to show name and percentage on slices
const renderPieCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  // Offset the text slightly to prevent overlap with the wedge, if needed
  const dx = x > cx ? 10 : -10;
  const dy = y > cy ? 10 : -10;

  return (
    <text x={x + dx} y={y + dy} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="middle" fontSize="12" style={{pointerEvents: 'none'}}>
      {`${channelData[index].name} ${channelData[index].value}%`}
    </text>
  );
};


// Custom Tooltip for Pie Chart to remove "value"
const CustomPieTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Radar Chart
const CustomRadarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name}: ${payload[0].value}`}</p>
        {payload[1] && <p className="label">{`${payload[1].name}: ${payload[1].value}`}</p>}
      </div>
    );
  }
  return null;
};

const CompleteAnalytics = () => {
  return (
    <div className="p-6 bg-[#0f172a] min-h-screen text-white">
      <h1 className="dashboard-title">Analytics Dashboard</h1>

      {/* Top Stats - Individual cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="stats-card">
          <CardContent className="stats-content">
            <div className="stats-text">
              <p className="stats-label">Revenue</p>
              <h2 className="stats-value">1,234,567 INR</h2>
              <p className="stats-change stats-green">↑ 12.5 vs last period</p>
            </div>
            <div className="stats-icon-wrapper stats-icon-green">
              <DollarSign size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="stats-content">
            <div className="stats-text">
              <p className="stats-label">Users</p>
              <h2 className="stats-value">45,678</h2>
              <p className="stats-change stats-green">↑ 8.3 vs last period</p>
            </div>
            <div className="stats-icon-wrapper stats-icon-green">
              <Users size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="stats-content">
            <div className="stats-text">
              <p className="stats-label">Orders</p>
              <h2 className="stats-value">9,876</h2>
              <p className="stats-change stats-red">↓ 6.9 vs last period</p>
            </div>
            <div className="stats-icon-wrapper stats-icon-red">
              <ShoppingCart size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className="stats-card">
          <CardContent className="stats-content">
            <div className="stats-text">
              <p className="stats-label">Page Views</p>
              <h2 className="stats-value">2,345,678</h2>
              <p className="stats-change stats-green">↑ 19.4 vs last period</p>
            </div>
            <div className="stats-icon-wrapper stats-icon-green">
              <Eye size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue vs Target - Area Chart with Dropdown */}
      <Card className="mb-6 revenue-target-card">
        <CardContent>
          <div className="card-header-with-dropdown">
            <h2 className="card-heading-left">Revenue vs Target</h2>
            <TimePeriodDropdown />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/> {/* Green gradient */}
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/> {/* Purple gradient */}
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} /> {/* Only horizontal lines */}
              <XAxis 
                dataKey="month" 
                stroke="#cbd5e1" 
                tickLine={false} 
                axisLine={false} 
                interval={0} 
                tick={{ fontSize: 12, fill: '#cbd5e1' }}
              />
              <YAxis 
                stroke="#cbd5e1" 
                tickLine={false} 
                axisLine={false} 
                domain={[0, 8000]} 
                ticks={[0, 2000, 4000, 6000, 8000]}
                tick={{ fontSize: 12, fill: '#cbd5e1' }}
              />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#f1f5f9' }} />
              <Area type="monotone" dataKey="revenue" stroke="#4ade80" fill="url(#colorRevenue)" strokeWidth={2} dot={{ stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Area type="monotone" dataKey="target" stroke="#8b5cf6" fill="url(#colorTarget)" strokeWidth={2} dot={{ stroke: '#fff', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', display: 'flex', justifyContent: 'center' }} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Channel + Product Performance - Two separate cards side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="chart-card">
          <CardContent>
            <h2 className="card-heading-left">Channel Performance</h2>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="value"
                  outerRadius={100}
                  fill="#8884d8"
                  label={renderPieCustomizedLabel} // Custom label for name and percentage
                  labelLine={false}
                  paddingAngle={5}
                  isAnimationActive={false}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend iconType="square" layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-card">
          <CardContent>
            <h2 className="card-heading-left">Product Performance</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={productData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} /> {/* Only horizontal lines */}
                <XAxis dataKey="name" stroke="#cbd5e1" tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <YAxis stroke="#cbd5e1" domain={[0, 6000]} ticks={[0, 1500, 3000, 4500, 6000]} tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#f1f5f9' }} />
                {/* Updated Bar Colors to match the target image */}
                <Bar dataKey="sales" fill="#818cf8" /> {/* Purple */}
                <Bar dataKey="revenue" fill="#10b981" /> {/* Green */}
                <Bar dataKey="profit" fill="#f97316" /> {/* Orange */}
                <Legend iconType="square" wrapperStyle={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Retention + Segmentation - Two separate cards side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="chart-card">
          <CardContent>
            <h2 className="card-heading-left">User Retention</h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={retentionData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="week" stroke="#cbd5e1" tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <YAxis stroke="#cbd5e1" domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#f1f5f9' }} />
                {/* Retention line: Purple-like color with diamonds */}
                <Line type="monotone" dataKey="retention" stroke="#8b5cf6" dot={{ stroke: '#fff', strokeWidth: 2, r: 4, shape: 'diamond' }} activeDot={{ r: 6 }} strokeWidth={2} />
                <Legend iconType="diamond" wrapperStyle={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="chart-card">
          <CardContent>
            <h2 className="card-heading-left">Customer Segmentation</h2>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" tick={{ fontSize: 12, fill: '#cbd5e1' }} />
                <PolarRadiusAxis angle={90} domain={[0, 150]} stroke="#334155" ticks={[0, 50, 100, 150]} tick={{ fontSize: 10, fill: '#cbd5e1' }} />
                {/* Segment A: Darker Purple/Blue */}
                <Radar name="Segment A" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                {/* Segment B: Darker Teal/Green */}
                <Radar name="Segment B" dataKey="B" stroke="#059669" fill="#059669" fillOpacity={0.6} />
                <Tooltip content={<CustomRadarTooltip />} />
                <Legend iconType="square" wrapperStyle={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} layout="horizontal" align="center" verticalAlign="bottom" />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights - with icons */}
      <Card className="insights-card">
        <CardContent>
          <h2 className="card-heading-left">AI Powered Insights</h2>
          <ul className="insights-list-icon">
            <li>
              <TrendingUp className="insight-icon text-green-400" />
              Revenue is up 15% compared to last month, driven primarily by a successful email campaign.
            </li>
            <li>
              <Users className="insight-icon text-blue-400" />
              Customer retention has improved by 8% following the launch of the new loyalty program.
            </li>
            <li>
              <Box className="insight-icon text-purple-400" />
              Product category “Electronics” shows the highest growth potential based on recent market trends.
            </li>
            <li>
              <DollarSign className="insight-icon text-yellow-400" />
              Optimizing pricing strategy could potentially increase overall profit margins by 5–7%.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteAnalytics;