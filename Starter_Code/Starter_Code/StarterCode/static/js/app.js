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

// Function to create bubble chart
function createBubbleChart(sampleData) {
  console.log("Sample data for bubble chart:", sampleData); // Log sample data for bubble chart

  // Create trace for the bubble chart
  let trace1 = {
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: 'markers',
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids,
      colorscale: 'Earth'
    }
  };

  // Define layout for the chart
  let layout = {
    title: 'Bacteria Cultures per Sample',
    xaxis: { title: 'OTU ID' },
    yaxis: { title: 'Sample Values' },
    showlegend: false,
    height: 600,
    width: 1000
  };

  // Plot the chart using Plotly
  Plotly.newPlot('bubble', [trace1], layout);
}

// Function to display sample metadata
function displayMetadata(metadata) {
  // Select the element where the metadata will be displayed
  const metadataPanel = d3.select("#sample-metadata");

  // Clear any existing metadata
  metadataPanel.html("");

  // Iterate over each key-value pair in the metadata object and append to the panel
  Object.entries(metadata).forEach(([key, value]) => {
    metadataPanel.append("p").text(`${key}: ${value}`);
  });

  // Adjust the size and placement of the metadata panel
  metadataPanel.style("width", "300px") // Adjust the width
               .style("height", "200px") // Adjust the height
               .style("overflow-y", "auto"); // Enable vertical scrolling
}

// Function to initialize the dashboard
async function init() {
  // Fetch data
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
      const sampleMetadata = data.metadata.find(sample => sample.id === parseInt(selectedSample));
      
      // Update all plots and metadata
      createBarChart(sampleData);
      createBubbleChart(sampleData);
      displayMetadata(sampleMetadata);
    });

    // Initial sample ID
    const initialSample = data.names[0];
    const initialSampleData = data.samples.find(sample => sample.id === initialSample);
    const initialSampleMetadata = data.metadata.find(sample => sample.id === parseInt(initialSample));
    
    // Create initial charts and display initial metadata
    createBarChart(initialSampleData);
    createBubbleChart(initialSampleData);
    displayMetadata(initialSampleMetadata);
  } else {
    console.error("Data not available.");
  }
}

// Call init function to initialize the dashboard
init();
