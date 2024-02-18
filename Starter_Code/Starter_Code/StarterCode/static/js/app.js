// Define URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data;

// Function to fetch data using D3
async function getData() {
  try {
    let response = await d3.json(url);
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
  let trace1 = {
    x: sampleData.sample_values.slice(0, 10).reverse(),
    y: sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
    text: sampleData.otu_labels.slice(0, 10).reverse(),
    name: "Top 10 OTUs",
    type: "bar",
    orientation: "h"
  };


  let layout = {
    title: "Top 10 OTUs Found",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" },
    margin: { t: 50, r: 50, b: 50, l: 200 }, // Adjust margin to make room for longer labels
    height: 400, // Set height
    width: 600, // Set width
    bargap: 0.1, // Set gap between bars
    autosize: true, // Enable autosize
    showlegend: false, // hide legend
    bordercolor: "black", // Set border color
    borderwidth: 2 // Set border width
  };
  // Plot the chart using Plotly
  Plotly.newPlot("bar", [trace1], layout);
}

// Function to initialize the dropdown menu
async function init() {
  // Fetch data
  let data = await getData();

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
  let initialSample = data.names[0];
  let initialSampleData = data.samples.find(sample => sample.id === initialSample);

  // Create initial chart
  createBarChart(initialSampleData);
}

// Function to initialize the dashboard
async function init() {
    // Fetch data and assign it to the global variable
    data = await getData();
  
    // Check if data is available before proceeding
    if (data) {
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
  
      // Event listener for bubble chart dropdown menu change
      d3.select("#selDataset").on("change", function() {
        let selectedSample = d3.select(this).property("value");
        let sampleData = data.samples.find(sample => sample.id === selectedSample);
        createBubbleChart(sampleData);
      });
  
      // Initial sample ID for bubble chart
      let initialSampleBubble = data.names[0];
      let initialSampleDataBubble = data.samples.find(sample => sample.id === initialSampleBubble);
  
      // Create initial bubble chart
      createBubbleChart(initialSampleDataBubble);
    } else {
      console.error("Data not available.");
    }
  }
  
  // Call init function to initialize the dashboard
  init();
  
  