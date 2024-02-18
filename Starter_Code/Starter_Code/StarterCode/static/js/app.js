// Define URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the data using D3
d3.json(url).then(importedData => {
  console.log("Imported data:", importedData); // Log imported data

  // Sort the data array by sample values.
  importedData.samples.sort((a, b) => b.sample_values - a.sample_values);

  // Slice the first 10 objects for plotting.
  const data = importedData.samples.slice(0, 10);

  // Reverse the array to match Plotly's default behavior.
  data.reverse();

  // Create trace for the horizontal bar chart
  const trace1 = {
    x: data.map(row => row.sample_values),
    y: data.map(row => `OTU ${row.otu_ids}`),
    text: data.map(row => row.otu_labels),
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
}).catch(error => {
  console.error("Error fetching or processing data:", error);
});
