import React from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const IssueDetailModal = ({ issue, onClose, onStatusChange }) => {
  if (!issue) return null;

  const {
    _id,
    title,
    description,
    location,
    category,
    status = "Pending",
    imageUrl,
    createdAt,
    updatedAt,
  } = issue;

  const colorClass = statusColors[status] || "bg-gray-100 text-gray-700";

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus !== status) {
      onStatusChange(_id, newStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-1">{title}</h2>

        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-500">
            {location || "No location"} • {category || "Other"}
          </p>
          <span
            className={`text-[11px] px-2 py-1 rounded-full font-medium ${colorClass}`}
          >
            {status}
          </span>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Reported:{" "}
          {createdAt ? new Date(createdAt).toLocaleString() : "Unknown"}
          {updatedAt && (
            <>
              {" • Updated: "}
              {new Date(updatedAt).toLocaleString()}
            </>
          )}
        </p>

        <div className="mb-4">
          <h3 className="text-xs font-semibold mb-1">Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">
            {description}
          </p>
        </div>

        {imageUrl && (
          <div className="mb-4">
            <h3 className="text-xs font-semibold mb-1">Attached Image</h3>
            <img
              src={imageUrl}
              alt="Issue"
              className="w-full rounded-lg border"
            />
          </div>
        )}

        <div className="flex items-center justify-between mt-2">
          <div>
            <label className="text-[11px] text-gray-500 mr-2">
              Update status:
            </label>
            <select
              className="border rounded-lg px-2 py-1 text-xs"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            className="text-xs px-3 py-1 rounded-lg border text-gray-600 hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailModal;
