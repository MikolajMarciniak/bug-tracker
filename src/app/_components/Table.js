import React from "react";

const Table = ({ columns, data, onRowDoubleClick }) => {
  const handleRowDoubleClick = (event, row) => {
    event.preventDefault();
    if (onRowDoubleClick) {
      onRowDoubleClick(row);
    }
  };

  return (
    <table className="min-w-full text-black bg-white shadow-md rounded-lg">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="py-2 px-4 border-b text-left">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="py-2 px-4 text-center">
              No data available
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onDoubleClick={(event) => handleRowDoubleClick(event, row)}
              className="cursor-pointer hover:bg-gray-100"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2 px-4 border-b">
                  {row[column]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
