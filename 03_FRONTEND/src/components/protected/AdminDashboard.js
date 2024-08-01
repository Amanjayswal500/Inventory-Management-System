import Search from "./Search";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {

  return (
    <div className="dash-container">
      <Sidebar />
      <main>
        <Search />
      </main>

      
    </div>
  );
};

export default AdminDashboard;