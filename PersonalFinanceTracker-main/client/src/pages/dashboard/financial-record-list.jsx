import React, { useState, useMemo } from "react";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useTable } from "react-table";

// EditableCell component
const EditableCell = ({ value: initialValue, row, column, updateRecord, editable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      className={`px-2 py-1 ${editable ? "cursor-pointer" : ""}`}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          className="w-full px-2 py-1 border border-gray-300 rounded"
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

// FinancialRecordList component
const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  const updateCellRecord = (rowIndex, columnId, value) => {
    const id = records[rowIndex]?._id;
    updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
  };

  const columns = useMemo(() => [
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord}
          editable={true}
        />
      ),
    },
    {
      Header: "Amount",
      accessor: "amount",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord}
          editable={true}
        />
      ),
    },
    {
      Header: "Category",
      accessor: "category",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord}
          editable={true}
        />
      ),
    },
    {
      Header: "Payment Method",
      accessor: "paymentMethod",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord}
          editable={true}
        />
      ),
    },
    {
      Header: "Date",
      accessor: "date",
      Cell: (props) => (
        <EditableCell
          {...props}
          updateRecord={updateCellRecord}
          editable={false}
        />
      ),
    },
    {
      Header: "Delete",
      id: "delete",
      Cell: ({ row }) => (
        <button
          onClick={() => deleteRecord(row.original._id ?? "")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      ),
    },
  ], [records]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: records,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} className="text-left">
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-4 py-2 text-gray-600 font-semibold"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="border-b last:border-none">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-2 text-gray-800"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialRecordList;
