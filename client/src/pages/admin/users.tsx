// UserAdminPage.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../lib/api";
import Button from "../../components/reusable/Button";
import Table from "../../components/reusable/Table";
import toast from "react-hot-toast";
import SkeletonTable from "../../components/reusable/TableLoading";
import { User } from "../../interfaces/types";
import { useQuery } from "react-query";

interface Column {
  label: string;
  field: string;
  render?: (item: any) => React.ReactNode; // Optional render function
}

const UsersAdminPage = () => {
  const {
    data: users,
    isLoading: loading,
    error,
  } = useQuery<User[]>("products", fetchUsers);
  const [rows, setRows] = useState<any[]>();

  useEffect(() => {
    if (error)
      //@ts-ignore
      toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (users)
      setRows(
        users?.map((user) => ({
          ...user,
          name: user.name,
          email: user.email,
          role: user.role,
        })) 
      );
  }, [users]);

  const columns: Column[] = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Role", field: "role" },
  ];

  const columnHeaders: any = [
    {
      field: "sn",
      headerName: "S/N",
      width: 100,
    },
    ...columns.map((column) => ({
      field: column.field,
      headerName: column.label,
      width: 200,
      renderCell: (params: any) =>
        column.render ? column.render(params.row) : params.row[column.field],
    })),
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: any) => (
        <div className="flex space-x-2">
          {actions.map((action, actionIndex) => (
            <button
              key={actionIndex}
              className={`${
                action.label.toLowerCase() === "delete"
                  ? "bg-red-500 hover:bg-red-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded text-sm`}
              onClick={() => null}
            >
              {action.label}
            </button>
          ))}
        </div>
      ),
    },
  ];

  const actions = [{ label: "Edit" }, { label: "Delete" }];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4 my-10">
        <h2 className="text-2xl font-semibold">Users</h2>
        <Button>
          <Link to="/admin/users/create">Create User</Link>
        </Button>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : (
        rows && <Table columnHeaders={columnHeaders} data={rows} />
      )}
    </div>
  );
};

export default UsersAdminPage;