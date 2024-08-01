import React from "react";

const Table = ({ columns, data, onRowClick }) => {
  return (
    <table className="min-w-full bg-white shadow-md rounded-lg">
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
            <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
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
