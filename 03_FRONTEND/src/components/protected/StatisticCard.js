const StatisticCard = ({ title, value, icon }) => {
  return (
    <div className="overview-card">
      <div className="overview-card-title">
        <span className="overview-card-icon">{icon}</span>
        {title}
      </div>
      <h3 className="overview-card-value">{value}</h3>
    </div>
  );
};

export default StatisticCard;

