import React, { useState, useEffect } from "react";
import ColumnList from "./components/ColumnList/ColumnList";
import DraggableBox from "./components/DraggableList/DraggableBox";
import LineChart from "./components/LineChart";

import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [chartData, setChartData] = useState({});

  console.log('chartData', chartData)

  const handleDragStart = (e, column) => {
    e.dataTransfer.setData("text/plain", column.name);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDimensionDrop = (e) => {
    e.preventDefault();
    const columnName = e.dataTransfer.getData('text');
    const column = columns.find(col => col.name === columnName && col.function === 'dimension');
    if (column) {
      setSelectedDimension(column.name);
    }
  };

  const handleMeasuresDrop = (e) => {
    e.preventDefault();
    const columnName = e.dataTransfer.getData('text');
    const column = columns.find(col => col.name === columnName && col.function === 'measure');
    if (column) {
      setSelectedMeasures(prevMeasures => {
        // This ensures that we don't add duplicate measure names and also allows multiple measures
        return [...new Set([...prevMeasures, column.name])];
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Logic to handle when a draggable item is over the DraggableBox
  };

  useEffect(() => {
    const fetchColumns = async () => {
      try {
        const response = await fetch(
          "https://plotter-task-8019e13a60ac.herokuapp.com/columns"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setColumns(data.columns);
      } catch (error) {
        console.error("Fetching columns failed: ", error);
      }
    };

    fetchColumns();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedDimension && selectedMeasures.length > 0) {
        try {
          const response = await fetch(
            "https://plotter-task-8019e13a60ac.herokuapp.com/data",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                measures: selectedMeasures,
                dimension: selectedDimension,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setChartData(result.data);
        } catch (error) {
          console.error("Fetching data values failed: ", error);
        }
      }
    };

    fetchData();
  }, [selectedDimension, selectedMeasures]);
  

  return (
    <div className="App">
      <div className="Sidebar">
        <ColumnList columns={columns} onDragStart={handleDragStart} />
      </div>
      <div className="MainContent">
        <DraggableBox
          title="Dimension"
          onDrop={handleDimensionDrop}
          onDragOver={handleDragOver}
          onClear={() => setSelectedDimension(null)}
        >
          {selectedDimension}
        </DraggableBox>
        <DraggableBox
          title="Measures"
          onDrop={handleMeasuresDrop}
          onDragOver={handleDragOver}
          onClear={() => setSelectedMeasures([])}
        >
          {selectedMeasures.length ? selectedMeasures.join(", ") : null}
        </DraggableBox>
        <div className="ChartContainer">
          {selectedDimension && selectedMeasures.length > 0 && (
            <LineChart data={chartData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
