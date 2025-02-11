import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [launchData, setLaunchData] = useState(null);
  const [launchCount, setLaunchCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [latestLaunchRes, allLaunchesRes] = await Promise.all([
        axios.get("https://api.spacexdata.com/v4/launches/latest"),
        axios.get("https://api.spacexdata.com/v4/launches"),
      ]);

      setLaunchData(latestLaunchRes.data);
      setLaunchCount(allLaunchesRes.data.length);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>🚀 SpaceX Latest Launch Information 🚀</h1>
      <p><strong>Total Launches:</strong> {launchCount}</p>
      <p><strong>Launch Name:</strong> {launchData?.name || "N/A"}</p>
      <p><strong>Launch Date (UTC):</strong> {new Date(launchData?.date_utc).toLocaleString()}</p>
      <p><strong>Rocket ID:</strong> {launchData?.rocket || "N/A"}</p>
      <p><strong>Launchpad ID:</strong> {launchData?.launchpad || "N/A"}</p>
    </div>
  );
}

export default App;
