import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activities, setActivities] = useState(() => {
  const saved = localStorage.getItem("activities");
  return saved ? JSON.parse(saved) : [];
  });
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Academic");
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  useEffect(() => {
  localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !category || !date) {
      setError("Please fill all fields.");
      return;
    }

    const newActivity = {
      id: Date.now(),
      name: name.trim(),
      category,
      date,
    };

    setActivities((prev) => [newActivity, ...prev]);
    setName("");
    setCategory("Academic");
    setDate("");
    setError("");
  };

  const filteredActivities =
    filter === "All"
      ? activities
      : activities.filter((activity) => activity.category === filter);

  return (
    <div className="container">
      <h1>PathCredit Logger</h1>

      <div className="card">
        <h2>Log an Activity</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Activity name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Academic">Academic</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="submit">Add Activity</button>
        </form>

        {error && <p className="error">{error}</p>}
      </div>

      <div className="card">
        <h2>Activity Feed</h2>

        <div className="filterBox">
          <label>Filter by category: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Academic">Academic</option>
            <option value="Technical">Technical</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {activities.length === 0 ? (
          <p>No activities logged yet.</p>
        ) : filteredActivities.length === 0 ? (
          <p>No activities found for this category.</p>
        ) : (
          <ul className="activityList">
            {filteredActivities.map((activity) => (
              <li key={activity.id} className="activityItem">
                <h3>{activity.name}</h3>
                <p><strong>Category:</strong> {activity.category}</p>
                <p><strong>Date:</strong> {activity.date}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;