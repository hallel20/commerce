const SkeletonTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
              <td className="px-4 py-2">
                <div className="h-10 bg-gray-200 animate-pulse rounded-md"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;