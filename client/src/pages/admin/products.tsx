// ProductAdminPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../../lib/api";
import { useQuery } from "react-query";
import Button from "../../components/reusable/Button";
import Table from "../../components/reusable/Table";
import toast from "react-hot-toast";
import SkeletonTable from "../../components/reusable/TableLoading";
import Image from "../../components/reusable/Image";
import { Product } from "../../interfaces/types";

interface Column {
  label: string;
  field: string;
  render?: (item: any) => React.ReactNode; // Optional render function
}

const ProductAdminPage = () => {
  const {
    data: products,
    isLoading: loading,
    error,
  } = useQuery<Product[]>("products", fetchProducts);

  const [rows, setRows] = useState<any[]>();

  useEffect(() => {
    if (error)
      //@ts-ignore
      toast.error(error.message);
  }, [error]);

  useEffect(() => {
    if (products)
      setRows(
        products?.map((product) => ({
          ...product,
          category: product.category?.name || "Empty",
          image:
            product.images && product.images.length > 0
              ? product.images[0].url
              : null,
        }))
      );
  }, [products]);

  const columns: Column[] = [
    { label: "Name", field: "name" },
    { label: "Price", field: "price" },
    { label: "Category", field: "category" },
    { label: "Stock", field: "stock" },
  ];

  const columnHeaders: any = [
    {
      field: "sn",
      headerName: "S/N",
      width: 100,
    },
    {
      field: "Image",
      headerName: "Image",
      width: 130,
      height: 120,
      renderCell: (params: any) =>
        params.row.image ? (
          <div className="flex items-center justify-center">
            <Image
              src={`/${params.row.image}`}
              alt={params.row.name}
              width={100}
              height={100}
            />
          </div>
        ) : null,
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
        <h2 className="text-2xl font-semibold">Products</h2>
        <Button>
          <Link to="/admin/products/create">Create Product</Link>
        </Button>
      </div>
      {loading ? (
        <SkeletonTable />
      ) : (
        rows && <Table columnHeaders={columnHeaders} data={rows!} />
      )}
    </div>
  );
};

export default ProductAdminPage;
