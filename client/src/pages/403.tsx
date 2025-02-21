// ForbiddenPage.tsx

import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const ForbiddenPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-4">403 Forbidden</h1>
        <p className="text-lg mb-4">
          Sorry, you don't have permission to access this page.
        </p>
        <p className="text-lg mb-4">
          Please check that you are logged in and have the necessary
          permissions.
        </p>
        <p className="text-lg mb-4">
          If you think this is an error, please contact our support team.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to="/">Return to homepage</Link>
        </button>
      </div>
    </Layout>
  );
};

export default ForbiddenPage;
