
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useState } from "react";
import * as XLSX from "xlsx";

const TimeSheetForm = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const periods = ["10-10-11", "10-11-10", "11-10-10"];

  const [selectedMonth, setSelectedMonth] = useState("June");
  const [selectedPeriod, setSelectedPeriod] = useState("10-10-11");
  const [dates, setDates] = useState(generateDates("June", "10-10-11"));

  const employees = [
    {
      name: "Amir Hossain",
      id: "407703",
      iqama: "2508658503",
      position: "Foreman",
    },
    {
      name: "Hilal Kamal",
      id: "401931",
      iqama: "2414440285",
      position: "Foreman",
    },
    {
      name: "BAYEJID MIAH",
      id: "407276",
      iqama: "2518759952",
      position: "Gardener",
    },
    {
      name: "MD ALKUS",
      id: "407277",
      iqama: "2518760430",
      position: "Gardener",
    },
  ];

  function generateDates(month, periodStr) {
    const parts = periodStr.split("-").map(Number);
    const days = parts.reduce((a, b) => a + b, 0);
    const result = [];
    for (let i = 1; i <= days; i++) {
      result.push(`${i}-${month.slice(0, 3)}`);
    }
    return result;
  }

  const handleMonthChange = (e) => {
    const newMonth = e.target.value;
    setSelectedMonth(newMonth);
    setDates(generateDates(newMonth, selectedPeriod));
  };

  const handlePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setSelectedPeriod(newPeriod);
    setDates(generateDates(selectedMonth, newPeriod));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Timesheet Report", 20, 10);
    const tableColumn = [
      "SN",
      "Name",
      "ID",
      "IQAMA",
      "Position",
      ...dates,
      "Total",
    ];
    const tableRows = [];

    employees.forEach((emp, idx) => {
      const row = [idx + 1, emp.name, emp.id, emp.iqama, emp.position];
      row.push(...Array(dates.length).fill("8"));
      row.push("" + 8 * dates.length);
      tableRows.push(row);
    });

    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
    doc.save("timesheet.pdf");
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.book_new();
    const tableData = [
      ["SN", "Name", "ID", "IQAMA", "Position", ...dates, "Total"],
      ...employees.map((emp, i) => [
        i + 1,
        emp.name,
        emp.id,
        emp.iqama,
        emp.position,
        ...Array(dates.length).fill("8"),
        8 * dates.length,
      ]),
    ];
    const sheet = XLSX.utils.aoa_to_sheet(tableData);
    XLSX.utils.book_append_sheet(ws, sheet, "Timesheet");
    XLSX.writeFile(ws, "timesheet.xlsx");
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg  mx-auto text-xs">
      <h2 className="text-center text-lg font-bold mb-4 uppercase">
        Daily Timesheet – Dammam Project 4012
      </h2>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="border px-2 py-1 rounded"
        >
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="border px-2 py-1 rounded"
        >
          {periods.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <button
          onClick={downloadPDF}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Download PDF
        </button>
        <button
          onClick={downloadExcel}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Download Excel
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto">
        <table className="table-auto w-full border border-gray-300 text-center">
          <thead className="bg-green-100">
            <tr>
              <th className="border px-2 py-1">SN</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">IQAMA</th>
              <th className="border px-2 py-1">Position</th>
              {dates.map((d, i) => (
                <th key={i} className="border px-1 py-1">
                  {d}
                </th>
              ))}
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx}>
                <td className="border px-1 py-1">{idx + 1}</td>
                <td className="border px-1 py-1">{emp.name}</td>
                <td className="border px-1 py-1">{emp.id}</td>
                <td className="border px-1 py-1">{emp.iqama}</td>
                <td className="border px-1 py-1">{emp.position}</td>
                {dates.map((_, i) => (
                  <td key={i} className="border px-1 py-1">
                    8
                  </td>
                ))}
                <td className="border px-1 py-1 font-bold text-green-600">
                  {8 * dates.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSheetForm;
