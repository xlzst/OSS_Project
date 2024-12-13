import React, { useEffect, useState } from "react";

const TestJSON = () => {
  const [jsonData, setJsonData] = useState(null); // Store parsed JSON data
  const [error, setError] = useState(null); // Store error messages
  const [loading, setLoading] = useState(false); // Loading state

  const fetchData = () => {
    setLoading(true);
    setError(null);

    // Initialize XMLHttpRequest
    const xhr = new XMLHttpRequest();
    const url = "http://apis.data.go.kr/B552881/kmooc_v2_0/courseList_v2_0";
    const key = "Sl7VyA9lMCV9eyR8NoauVEgi9ZlK68K2gQU5H4vRdsIP%2BClSh%2FqTR0fMxgxzx7k7FIY%2Bc17ZXAciJMrpILejew%3D%3D";
    const queryParams =
      "?" + encodeURIComponent("serviceKey") + "=" + key;

    xhr.open("GET", url + queryParams);

    // Define the callback
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          try {
            const responseJSON = JSON.parse(xhr.responseText); // Parse JSON data
            setJsonData(responseJSON); // Store parsed JSON data
          } catch (e) {
            setError("Failed to parse JSON response.");
          }
        } else {
          setError(`Failed to load data. Status code: ${xhr.status}`);
        }
        setLoading(false);
      }
    };

    xhr.onerror = function () {
      setError("An error occurred while making the request.");
      setLoading(false);
    };

    // Send the request
    xhr.send();
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="page-title">JSON Data</h2>
      <pre
        style={{
          backgroundColor: "#f4f4f4",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        {jsonData ? JSON.stringify(jsonData, null, 2) : "No Data Available"}
      </pre>
    </div>
  );
};

export default TestJSON;