import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const IssueCard = ({ issue, onClick, onStatusChange }) => {
  const {
    _id,
    title,
    description,
    location,
    category,
    status = "Pending",
    createdAt,
  } = issue;

  const colorClass = statusColors[status] || "bg-gray-100 text-gray-700";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleString()
    : "Unknown";

  const handleSelectChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== status) {
      onStatusChange(_id, newStatus);
    }
  };

  return (
    <div
      className="border rounded-xl p-4 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
      onClick={onClick}
    >
      <div>
        {/* Top row */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-sm mb-1">{title}</h3>
            <p className="text-xs text-gray-500">
              {location || "No location"} • {category || "Other"}
            </p>
          </div>

          <span
            className={`text-[11px] px-2 py-1 rounded-full font-medium ${colorClass}`}
          >
            {status}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
          {description}
        </p>

        <p className="text-[11px] text-gray-400">Reported: {formattedDate}</p>
      </div>

      {/* Status dropdown (admin-style control) */}
      <div
        className="mt-3"
        onClick={(e) => e.stopPropagation()} // prevent card onClick
      >
        <label className="text-[11px] text-gray-500 mr-2">
          Update status:
        </label>
        <select
          className="border rounded-lg px-2 py-1 text-xs"
          value={status}
          onChange={handleSelectChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default IssueCard;
