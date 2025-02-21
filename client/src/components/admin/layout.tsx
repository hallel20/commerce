import Header from "./header";
import Sidebar from "./sidebar";

const AdminLayout = ({ isAdmin, children }: { isAdmin: boolean; children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar isAdmin={isAdmin} />
      <div className="xl:w-10/12 lg:w-9/12">
        <Header />
        { children }
      </div>
    </div>
  );
};

export default AdminLayout;
