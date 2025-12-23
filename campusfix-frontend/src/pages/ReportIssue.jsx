import React, { useState } from "react";
import api from "../api/axios";

const ReportIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/issues", {
        title,
        description,
        category,
        location,
        imageUrl: imageUrl || ""
      });

      alert("Issue Submitted Successfully");
      setTitle("");
      setDescription("");
      setLocation("");
      setImageUrl("");
    } catch (error) {
      console.error("Error submitting issue:", error);
      alert("Submit failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Report Issue</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Issue Title"
          className="w-full p-3 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write issue description..."
          className="w-full p-3 border rounded h-28"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <div className="flex gap-4">
          <select
            className="p-3 border rounded w-1/2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Electrical</option>
            <option>Network</option>
            <option>Software</option>
            <option>Hardware</option>
            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="Location (room / lab / dept)"
            className="w-1/2 p-3 border rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Image URL (optional)"
          className="w-full p-3 border rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportIssue;
