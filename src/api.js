const BASE_URL = "https://plotter-task-8019e13a60ac.herokuapp.com";

export const fetchColumns = async () => {
  const response = await fetch(`${BASE_URL}/columns`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const fetchData = async (selectedDimension, selectedMeasures) => {
  const response = await fetch(`${BASE_URL}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      measures: selectedMeasures,
      dimension: selectedDimension,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
