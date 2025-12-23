import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const STATUS_COLORS = {
    Completed: "#4CAF50",
    "In Progress": "#FFC107",
    Pending: "#2196F3",
  };

  // Fetch issues from backend
  const fetchIssues = async () => {
    try {
      const res = await axios.get("/issues");
      setIssues(res.data);
      setFilteredIssues(res.data);
    } catch (error) {
      console.error("Fetch Issues Error:", error);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // Search & Filter
  useEffect(() => {
    let temp = issues;

    if (search.trim() !== "")
      temp = temp.filter(
        (i) =>
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.description.toLowerCase().includes(search.toLowerCase()) ||
          i.location.toLowerCase().includes(search.toLowerCase())
      );

    if (statusFilter !== "All")
      temp = temp.filter((i) => i.status === statusFilter);

    if (categoryFilter !== "All")
      temp = temp.filter((i) => i.category === categoryFilter);

    setFilteredIssues(temp);
  }, [search, statusFilter, categoryFilter, issues]);

  // Dashboard summary counts
  const total = issues.length;
  const pending = issues.filter((i) => i.status === "Pending").length;
  const progress = issues.filter((i) => i.status === "In Progress").length;
  const complete = issues.filter((i) => i.status === "Completed").length;

  // Chart Data
  const pieData = [
    { name: "Pending", value: pending },
    { name: "In Progress", value: progress },
    { name: "Completed", value: complete },
  ];

  const categoryData = Object.values(
    issues.reduce((acc, cur) => {
      acc[cur.category] = acc[cur.category] || { category: cur.category, count: 0 };
      acc[cur.category].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-8">

      {/* ⬇️ NEW — Report Issue button added here */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Issues</h1>
          <p className="text-gray-500">Track and manage all issues reported on campus.</p>
        </div>
        <button
          onClick={() => (window.location.href = "/report")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow flex items-center gap-2"
        >
          ➕ Report Issue
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm">Total Issues</h3>
          <p className="text-4xl font-bold">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm">Pending</h3>
          <p className="text-4xl font-bold">{pending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm">In Progress</h3>
          <p className="text-4xl font-bold">{progress}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-600 text-sm">Completed</h3>
          <p className="text-4xl font-bold">{complete}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title, description or location..."
          className="w-full p-3 border rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="p-3 border rounded-lg" onChange={(e) => setStatusFilter(e.target.value)}>
          <option>Status: All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <select className="p-3 border rounded-lg" onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>Category: All</option>
          <option>Electrical</option>
          <option>Plumbing</option>
          <option>Furniture</option>
          <option>Network</option>
          <option>Other</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Issues by Status</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={Object.values(STATUS_COLORS)[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Issues by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4285F4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Issue List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4">All Issues</h3>
        {filteredIssues.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No issues found</p>
        ) : (
          <div className="space-y-6">
            {filteredIssues.map((i) => (
              <div key={i._id} className="border rounded-xl p-5 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold">{i.title}</h4>
                  <p className="text-sm text-gray-500">{i.location} • {i.category}</p>
                  <p className="mt-1">{i.description}</p>
                </div>
                <span
                  className="px-4 py-1 text-sm rounded-full font-semibold"
                  style={{ background: STATUS_COLORS[i.status], color: "white" }}
                >
                  {i.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
