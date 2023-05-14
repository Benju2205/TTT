
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CSVLink } from "react-csv";

function App() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState([]);

  const handleSubmit = async () => {
    const response = await fetch("https://www.terriblytinytales.com/test.txt");
    const data = await response.text();
    setText(data);
    setWordCount(getWordCount(data));
  };

  const getWordCount = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    const counts = {};

    words.forEach((word) => {
      counts[word] = counts[word] ? counts[word] + 1 : 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, count }));
  };

  const csvData = wordCount.map((item) => ({
    Word: item.word,
    Count: item.count,
  }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {wordCount.length > 0 && (
        <>
          <BarChart
            width={1800}
            height={600}
            data={wordCount}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button className="btn btn-success" onClick={handleSubmit}>
              <CSVLink
                data={csvData}
                style={{ color: "white", textDecoration: "none" }}
              >
                Export
              </CSVLink>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
