import { useState } from "react";

export default function App() {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const columns = [
    "Record Date",
    "Approver",
    "Reporter",
    "Phone Number",
    "Issue",
    "Location",
    "Shop",
    "Assigned",
    "Urgency",
    "Report",
    "Completion Date",
  ];

  const handleNewRecordChange = (e, column) => {
    setNewRecord({ ...newRecord, [column]: e.target.value });
  };

  const addNewRecord = () => {
    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = { ...newRecord, "Record No": editIndex + 1 };
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      const newRecordWithId = { "Record No": records.length + 1, ...newRecord };
      setRecords([...records, newRecordWithId]);
    }
    setNewRecord({});
  };

  const editRecord = (index) => {
    setNewRecord(records[index]);
    setEditIndex(index);
  };

  const deleteRecord = (index) => {
    setRecords(records.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">FAULTY RECORD SYSTEM</h1>
      <table className="w-full bg-white border rounded mt-4">
        <thead>
          <tr>
            <th className="border p-2 text-left">Record No</th>
            {columns.map((column, idx) => (
              <th key={idx} className="border p-2 text-left">
                {column}
              </th>
            ))}
            <th className="border p-2">Options</th>
          </tr>
          <tr>
            <td className="border p-2 text-center">#</td>
            {columns.map((column, idx) => (
              <td key={idx} className="border p-2">
                <input
                  type="text"
                  placeholder={`Enter ${column}`}
                  value={newRecord[column] || ""}
                  onChange={(e) => handleNewRecordChange(e, column)}
                  className="border p-1 w-full text-sm"
                />
              </td>
            ))}
            <td className="border p-2 text-center">
              <button
                onClick={addNewRecord}
                className={`px-4 py-2 rounded text-white ${
                  editIndex !== null ? "bg-yellow-500" : "bg-blue-500"
                }`}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </td>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td className="border p-2 text-center flex justify-between">
                {record["Record No"]}
              </td>
              {columns.map((column, idx) => (
                <td key={idx} className="border p-2">
                  {record[column] || "-"}
                </td>
              ))}
              <td className="border p-2 text-center">
                <button
                  onClick={() => editRecord(index)}
                  className="bg-green-500 text-white px-2 py-1 mr-2 rounded w-[40px] h-[40px]"
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteRecord(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded w-[40px] h-[40px]"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
