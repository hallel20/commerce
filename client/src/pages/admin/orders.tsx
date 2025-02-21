// ProductAdminPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../lib/api";
import Button from "../../components/reusable/Button";
import Table from "../../components/reusable/Table";
import toast from "react-hot-toast";
import SkeletonTable from "../../components/reusable/TableLoading";
import { Order } from "../../interfaces/types";
import { useQuery } from "react-query";

interface Column {
  label: string;
  field: string;
  render?: (item: any) => React.ReactNode; // Optional render function
}

const OrdersAdminPage = () => {
  const {
    data: orders,
    isLoading: loading,
    error,
  } = useQuery<Order[]>("products", fetchOrders);
  const [rows, setRows] = useState<any[]>();

  useEffect(() => {
    if (error)
      //@ts-ignore
      toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (orders)
      setRows(
        orders?.map((order) => ({
          ...order,
          username: 
          // order.user.account
          //   ? order.user.account.firstName + " " + order.user.account.lastName
          //   : 
            "No name",
        })) 
      );
  }, [orders]);

  const columns: Column[] = [
    { label: "ID", field: "id" },
    { label: "User", field: "username" },
    // { label: "Items", field: "items" },
    { label: "Total", field: "total" },
    { label: "Status", field: "status" },
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
        <h2 className="text-2xl font-semibold">Order</h2>
        <Button>
          <Link to="/admin/products/create">Create Order</Link>
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

export default OrdersAdminPage;
