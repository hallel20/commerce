const Header = () => {
  return (
    <div className="bg-white shadow-md p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Commerce Dashboard</h1>
      <div className="text-gray-700">
        <span>Welcome, Admin</span> {/* Change based on user role */}
      </div>
    </div>
  );
};

export default Header;
