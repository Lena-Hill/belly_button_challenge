// Define URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Function to fetch data using D3
async function getData() {
  try {
    const response = await d3.json(url);
    console.log("Imported data:", response); // Log imported data
    return response;
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
}

// Function to create horizontal bar chart
function createBarChart(sampleData) {
  console.log("Sample data for bar chart:", sampleData); // Log sample data for bar chart

  // Create trace for the horizontal bar chart
  const trace1 = {
    x: sampleData.sample_values.slice(0, 10),
    y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`),
    text: sampleData.otu_labels.slice(0, 10),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };

  // Define layout for the chart
  const layout = {
    title: "Top 10 OTUs Found",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" }
  };

  // Plot the chart using Plotly
  Plotly.newPlot("bar", [trace1], layout);
}

// Function to initialize the dropdown menu
async function init() {
  // Fetch data
  const data = await getData();

  // Populate dropdown menu with sample IDs
  const dropdownMenu = d3.select("#selDataset");
  data.names.forEach(sample => {
    dropdownMenu.append("option").attr("value", sample).text(sample);
  });

  // Event listener for dropdown menu change
  dropdownMenu.on("change", function() {
    const selectedSample = d3.select(this).property("value");
    const sampleData = data.samples.find(sample => sample.id === selectedSample);
    createBarChart(sampleData);
  });

  // Initial sample ID
  const initialSample = data.names[0];
  const initialSampleData = data.samples.find(sample => sample.id === initialSample);

  // Create initial chart
  createBarChart(initialSampleData);
}

// Call init function to initialize the dashboard
init();
