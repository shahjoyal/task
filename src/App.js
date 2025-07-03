
// import React, { useState } from "react";
// import Papa from "papaparse";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// import "./App.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function App() {
//   const [data, setData] = useState([]);
//   const [headers, setHeaders] = useState([]);
//   const [columnInput, setColumnInput] = useState("");
//   const [stats, setStats] = useState({});
//   const [currentColumn, setCurrentColumn] = useState("");
//   const [activeSection, setActiveSection] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(true);

//   const closeWelcome = () => setShowWelcome(false);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       complete: (results) => {
//         setData(results.data);
//         setHeaders(Object.keys(results.data[0]));
//         setActiveSection("");
//       },
//     });
//   };

//   const calculateStats = (col) => {
//     if (!col) return;

//     const values = data
//       .map((row) => parseFloat(row[col]))
//       .filter((v) => !isNaN(v))
//       .sort((a, b) => a - b);
//     if (values.length === 0) return;

//     const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
//     const median =
//       values.length % 2 === 0
//         ? ((values[values.length / 2 - 1] + values[values.length / 2]) / 2).toFixed(2)
//         : values[Math.floor(values.length / 2)].toFixed(2);
//     const mode = values
//       .sort(
//         (a, b) =>
//           values.filter((v) => v === b).length - values.filter((v) => v === a).length
//       )[0];
//     const min = values[0].toFixed(2);
//     const max = values[values.length - 1].toFixed(2);

//     setStats({ mean, median, mode, min, max });
//     setCurrentColumn(col);
//   };

//   const handleButtonClick = (section) => {
//     setLoading(true);
//     if (section === "stats" || section === "graph") calculateStats(columnInput);
//     setTimeout(() => {
//       setActiveSection(section);
//       setLoading(false);
//     }, 400);
//   };

//   const chartData = {
//     labels: ["Mean", "Median", "Mode", "Min", "Max"],
//     datasets: [
//       {
//         label: currentColumn,
//         data: [
//           stats.mean,
//           stats.median,
//           stats.mode,
//           stats.min,
//           stats.max,
//         ],
//         backgroundColor: "#4a90e2",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     indexAxis: "y",
//     elements: {
//       bar: {
//         borderRadius: 4,
//         borderWidth: 1,
//         barThickness: 30,
//       },
//     },
//   };

//   if (showWelcome) {
//     return (
//       <div className="welcome-card">
//         <button onClick={closeWelcome} className="welcome-close">❌</button>
//         <h2>Hello I am <strong>Joyal Shah</strong></h2>
//         <p>
//           Welcome to the <strong>Assignment – Graduate Engineer Trainee Position</strong> (Abhitech Energycon).<br />
//           Hope you have an amazing day!
//         </p>
//         <div className="welcome-actions">
//           <button onClick={closeWelcome} className="ok-btn">OK ✅</button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <header>
//         <div className="logo">J</div>
//         <h1>Welcome to Joyal Shah's Task</h1>
//       </header>

//       <div className="App">
//         <p className="instructions">
//           📁 You need to upload a CSV file and then enter the column name to get
//           the 📊 stats of that particular column. Thank you!
//         </p>

//         <div className="button-group">
//           <label htmlFor="file-upload" className="upload-btn">
//             Upload CSV
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             accept=".csv"
//             onChange={handleFileUpload}
//             style={{ display: "none" }}
//           />
//           <button onClick={() => handleButtonClick("table")}>
//             Show Data
//           </button>
//         </div>

//         {data.length > 0 && (
//           <div className="form-section">
//             <input
//               type="text"
//               placeholder="Enter column name"
//               value={columnInput}
//               onChange={(e) => setColumnInput(e.target.value)}
//             />
//             <button onClick={() => handleButtonClick("stats")}>
//               Show Stats
//             </button>
//             <button onClick={() => handleButtonClick("graph")}>
//               Show Graph
//             </button>
//           </div>
//         )}

//         {loading && <div className="loader"></div>}

//         {!loading && activeSection === "table" && (
//           <div className="fade-in card">
//             <h2>📄 First 5 Rows of Data</h2>
//             <table className="styled-table">
//               <thead>
//                 <tr>
//                   {headers.map((header) => (
//                     <th key={header}>{header}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.slice(0, 5).map((row, i) => (
//                   <tr key={i}>
//                     {headers.map((header) => (
//                       <td key={header}>{row[header]}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {!loading && activeSection === "stats" && currentColumn && (
//           <div className="fade-in card">
//             <h2>📊 Stats of "{currentColumn}"</h2>
//             <table className="stats-table-enhanced">
//               <thead>
//                 <tr>
//                   <th>📌 Metric</th>
//                   <th>Value</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr><td>📈 Mean</td><td>{stats.mean}</td></tr>
//                 <tr><td>📉 Median</td><td>{stats.median}</td></tr>
//                 <tr><td>🔢 Mode</td><td>{stats.mode}</td></tr>
//                 <tr><td>⬇️ Min</td><td>{stats.min}</td></tr>
//                 <tr><td>⬆️ Max</td><td>{stats.max}</td></tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {!loading && activeSection === "graph" && currentColumn && (
//           <div className="fade-in card">
//             <h2>📊 Stats Chart</h2>
//             <div className="chart-container">
//               <Bar data={chartData} options={chartOptions} />
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useState } from "react";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [columnInput, setColumnInput] = useState("");
  const [stats, setStats] = useState({});
  const [currentColumn, setCurrentColumn] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  const closeWelcome = () => setShowWelcome(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        setHeaders(Object.keys(results.data[0]));
        setActiveSection("");
      },
    });
  };

  const calculateStats = (col) => {
    if (!col) return;

    const values = data
      .map((row) => parseFloat(row[col]))
      .filter((v) => !isNaN(v))
      .sort((a, b) => a - b);
    if (values.length === 0) return;

    const mean = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2);
    const median =
      values.length % 2 === 0
        ? ((values[values.length / 2 - 1] + values[values.length / 2]) / 2).toFixed(2)
        : values[Math.floor(values.length / 2)].toFixed(2);
    const mode = values
      .sort(
        (a, b) =>
          values.filter((v) => v === b).length - values.filter((v) => v === a).length
      )[0];
    const min = values[0].toFixed(2);
    const max = values[values.length - 1].toFixed(2);

    setStats({ mean, median, mode, min, max });
    setCurrentColumn(col);
  };

  const handleButtonClick = (section) => {
    if (!data.length && section === "table") {
      alert("⚠️ Please upload a CSV file first.");
      return;
    }

    if (!data.length && (section === "stats" || section === "graph")) {
      alert("⚠️ Please upload a CSV file and enter a valid column name.");
      return;
    }

    if (!columnInput && (section === "stats" || section === "graph")) {
      alert("⚠️ Please enter the column name.");
      return;
    }

    setLoading(true);

    if (section === "stats" || section === "graph") calculateStats(columnInput);

    setTimeout(() => {
      setActiveSection(section);
      setLoading(false);
    }, 400);
  };

  const chartData = {
    labels: ["Mean", "Median", "Mode", "Min", "Max"],
    datasets: [
      {
        label: currentColumn,
        data: [
          stats.mean,
          stats.median,
          stats.mode,
          stats.min,
          stats.max,
        ],
        backgroundColor: "#4a90e2",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    elements: {
      bar: {
        borderRadius: 4,
        borderWidth: 1,
        barThickness: 30,
      },
    },
  };

  if (showWelcome) {
    return (
      <div className="welcome-card">
        <button onClick={closeWelcome} className="welcome-close">❌</button>
        <h2>Hello I am <strong>Joyal Shah</strong></h2>
        <p>
          Welcome to the <strong>Assignment – Graduate Engineer Trainee Position</strong> (Abhitech Energycon).<br />
          Hope you have an amazing day!
        </p>
        <div className="welcome-actions">
          <button onClick={closeWelcome} className="ok-btn">OK ✅</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <div className="logo">J</div>
        <h1>Welcome to Joyal Shah's Task</h1>
      </header>

      <div className="App">
        <p className="instructions">
          📁 You need to upload a CSV file and then enter the column name to get
          the 📊 stats of that particular column. Thank you!
        </p>

        <div className="button-group">
          <label htmlFor="file-upload" className="upload-btn">
            Upload CSV
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button onClick={() => handleButtonClick("table")}>
            Show Data
          </button>
        </div>

        {data.length > 0 && (
          <div className="form-section">
            <input
              type="text"
              placeholder="Enter column name"
              value={columnInput}
              onChange={(e) => setColumnInput(e.target.value)}
            />
            <button onClick={() => handleButtonClick("stats")}>
              Show Stats
            </button>
            <button onClick={() => handleButtonClick("graph")}>
              Show Graph
            </button>
          </div>
        )}

        {loading && <div className="loader"></div>}

        {!loading && activeSection === "table" && (
          <div className="fade-in card">
            <h2>📄 First 5 Rows of Data</h2>
            <table className="styled-table">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 5).map((row, i) => (
                  <tr key={i}>
                    {headers.map((header) => (
                      <td key={header}>{row[header]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && activeSection === "stats" && currentColumn && (
          <div className="fade-in card">
            <h2>📊 Stats of "{currentColumn}"</h2>
            <table className="stats-table-enhanced">
              <thead>
                <tr>
                  <th>📌 Metric</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>📈 Mean</td><td>{stats.mean}</td></tr>
                <tr><td>📉 Median</td><td>{stats.median}</td></tr>
                <tr><td>🔢 Mode</td><td>{stats.mode}</td></tr>
                <tr><td>⬇️ Min</td><td>{stats.min}</td></tr>
                <tr><td>⬆️ Max</td><td>{stats.max}</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {!loading && activeSection === "graph" && currentColumn && (
          <div className="fade-in card">
            <h2>📊 Stats Chart</h2>
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
