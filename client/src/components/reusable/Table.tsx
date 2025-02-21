// Table.tsx
import React from "react";
import { DataGrid, GridRowsProp } from "@mui/x-data-grid";

interface TableProps {
  data: any[];
  columnHeaders: any;
}

const Table: React.FC<TableProps> = ({ data, columnHeaders }) => {
  

  const gridRows: GridRowsProp = data.map((row, index) => ({
    id: index + 1,
    sn: index + 1,
    ...row,
  }));

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid rows={gridRows} columns={columnHeaders} />
    </div>
  );
};

export default Table;
