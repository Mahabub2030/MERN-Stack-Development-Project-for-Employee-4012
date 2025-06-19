import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";


const pdfData = [
  {
    id: "407703",
    name: "Amir Hossain",
    title: "Foreman",
    group: "Airport N & S",
    file: "/public/Iqama_4012/407703.pdf",
    description: "this one  only Iqama.",
  },
  {
    id: "401931",
    name: "Hilal Kamal ",
    title: "Foreman",
    group: "Airport N & S",
    file: "/public/Iqama_4012/401931.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "407276",
    name: "BAYEJID MIAH ",
    title: "Gardener",
    group: "Airport N & S",
    file: "/public/Iqama_4012/407276.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "407277",
    name: "MD ALKUS",
    title: "Gardener",
    group: "Airport N & S",
    file: "/public/Iqama_4012/407277.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "407411",
    name: "PRASENJIT DAS",
    title: "Gardener",
    group: "Airport N & S",
    file: "/public/Iqama_4012/407411.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "407611",
    name: "Mohammad Sakil Bhuiyan",
    title: "Labour",
    group: "Airport N & S",
    file: "/public/Iqama_4012/407611.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "401815",
    name: "Hassan Nawaz	",
    title: "Technician",
    group: "Airport N & S",
    file: "/public/Iqama_4012/401815.pdf",
    description: "this one only Iqama.",
  },
  {
    id: "408250",
    name: "Akram Hossan		",
    title: "Labour",
    group: "Airport N & S",
    file: "/public/Iqama_4012/408250.pdf",
    description: "this one only Iqama.",
  },
];

const Files = () => {
  const [search, setSearch] = useState("");
  const [groupFilter, setGroupFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const groups = ["All", ...new Set(pdfData.map((item) => item.group))];

  const filteredData = pdfData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.id.includes(search);
    const matchesGroup = groupFilter === "All" || item.group === groupFilter;
    return matchesSearch && matchesGroup;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4 mt-10">
      {/* Filter Controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex items-center  max-w-md shadow px-3 py-2 rounded-md">
          <FaSearch className=" mr-2 " />
          <input
            type="text"
            placeholder="Search by Name or ID"
            className="w-full text-sm bg-[#84B941] text-black"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Group Filter */}
        <select
          className="text-sm px-3 py-2 rounded border shadow"
          value={groupFilter}
          onChange={(e) => {
            setGroupFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          {groups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border text-sm 0">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
              <th className="p-2 border">Remark</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((file, index) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="p-2 border">{file.id}</td>
                <td className="p-2 border">{file.name}</td>
                <td className="p-2 border">{file.group}</td>
                <td className="p-2 border">{file.title}</td>
                <td className="p-2 border">{file.description}</td>
                <td className="p-2 border text-center flex justify-around ">
                  <a
                    href={file.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-1  hover:bg-green-500 text-black rounded border  text-xs"
                  >
                    <MdOutlineRemoveRedEye />
                  </a>
                  <a
                    href={file.file}
                    download
                    className="px-2 py-1 hover:bg-green-500 text-black rounded  border text-xs"
                  >
                    <FaArrowTurnDown />
                  </a>
                </td>
              </tr>
            ))}
            {currentData.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-400">
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2 flex-wrap">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Files;
