import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ColumnList from "./components/ColumnList/ColumnList";
import DraggableBox from "./components/DraggableBox/DraggableBox";
import LineChart from "./components/LineChart";
import { fetchColumns, fetchData } from "./api";

import "./App.css";

function App() {
  const [columns, setColumns] = useState([]);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [selectedMeasures, setSelectedMeasures] = useState([]);
  const [chartData, setChartData] = useState({});

  const handleDragStart = (e, column) => {
    e.dataTransfer.setData("text/plain", column.name);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDimensionDrop = (e) => {
    e.preventDefault();
    const columnName = e.dataTransfer.getData("text");
    const column = columns.find(
      (col) => col.name === columnName && col.function === "dimension"
    );
    if (column) {
      setSelectedDimension(column.name);
    } else {
      toast.error("You can't drop a measure into the dimension box!");
    }
  };

  const handleMeasuresDrop = (e) => {
    const columnName = e.dataTransfer.getData("text");
    const column = columns.find(
      (col) => col.name === columnName && col.function === "measure"
    );
    if (column) {
      setSelectedMeasures([column.name]);
    } else {
      toast.error("You can't drop a dimension into the measures box!");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Logic to handle when a draggable item is over the DraggableBox
  };
  useEffect(() => {
    fetchColumns()
      .then((data) => setColumns(data.columns))
      .catch((error) => console.error("Fetching columns failed: ", error));
  }, []);

  useEffect(() => {
    if (selectedDimension && selectedMeasures.length > 0) {
      fetchData(selectedDimension, selectedMeasures)
        .then((result) => {
          const transformedData = transformChartData(
            result.data,
            selectedDimension,
            selectedMeasures
          );
          setChartData(transformedData);
        })
        .catch((error) =>
          console.error("Fetching data values failed: ", error)
        );
    }
  }, [selectedDimension, selectedMeasures]);

  const transformChartData = (data, dimension, measures) => {
    const dimensionData = data.find((d) => d.name === dimension);
    const measureData = data.filter((d) => measures.includes(d.name));

    return dimensionData.values.map((dimValue, index) => {
      const dataPoint = { [dimensionData.name]: dimValue };
      measureData.forEach((measure) => {
        dataPoint[measure.name] = measure.values[index];
      });
      return dataPoint;
    });
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="Sidebar">
        <ColumnList
          title="Dimensions"
          columns={columns.filter((col) => col.function === "dimension")}
          onDragStart={handleDragStart}
        />
        <ColumnList
          title="Measures"
          columns={columns.filter((col) => col.function === "measure")}
          onDragStart={handleDragStart}
        />
      </div>
      <div className="MainContent">
        <DraggableBox
          title="Dimension"
          onDrop={handleDimensionDrop}
          onDragOver={handleDragOver}
          onClear={() => setSelectedDimension(null)}
          placeholder="Drag a dimension here"
        >
          {selectedDimension}
        </DraggableBox>
        <DraggableBox
          title="Measures"
          onDrop={handleMeasuresDrop}
          onDragOver={handleDragOver}
          onClear={() => setSelectedMeasures([])}
          placeholder="Drag measures here"
        >
          {selectedMeasures.length ? selectedMeasures.join(", ") : null}
        </DraggableBox>
        <div className="ChartContainer">
          {selectedDimension && selectedMeasures.length > 0 && (
            <LineChart
              data={chartData}
              dimension={selectedDimension}
              measures={selectedMeasures}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
