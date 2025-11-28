import StatisticCard from "./StatisticCard";
import LineChartCard from "./LineChartCard";
import BarChartCard from "./BarChartCard";

const AnalyticsDashboard = () => {
  return (
    <div className="analytics-dashboard-container">
      <div className="overview-section">
        <h2>Overview</h2>
        <div className="overview-grid">
          <StatisticCard title="Total Customers" value="2,450" icon="👤" />
          <StatisticCard title="Total Products" value="1,230" icon="📦" />
          <StatisticCard title="Total Sales" value="15,000 INR" icon="💰" />
          <StatisticCard title="Pending Orders" value="120" icon="📝" />
        </div>
      </div>
      <div className="charts-grid">
        <LineChartCard />
        <BarChartCard />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
