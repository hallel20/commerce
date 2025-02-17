import Header from "./header";
import Sidebar from "./sidebar";

const AdminLayout = ({ isAdmin, children }: { isAdmin: boolean; children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar isAdmin={isAdmin} />
      <div className="flex-1">
        <Header />
        { children }
      </div>
    </div>
  );
};

export default AdminLayout;
