// ProductCreatePage.tsx (Page Component)
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosConfig"; // Adjust path
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductForm from "./form"; // Import the form component

const ProductCreatePage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="p-6 max-w-2xl mt-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create Product</h2>
        <Link
          to="/admin/products"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Back
        </Link>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
};

export default ProductCreatePage;
