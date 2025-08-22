import Search from "./Search";
import Sidebar from "./Sidebar";
import AnalyticsDashboard from "./AnalyticsDashboard";

const AdminDashboard = () => {

  return (
    <div className="dash-container">
      <Sidebar />
      
      <main>
        {/* <Search /> */}
       <AnalyticsDashboard /> 
      </main>

      
    </div>
  );
};

export default AdminDashboard;