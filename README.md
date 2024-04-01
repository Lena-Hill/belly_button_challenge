# Interactive Web Visualizations

## Overview

This project presents interactive visualizations of microbiome data using D3.js and Plotly.js. It fetches data from a JSON file hosted online and dynamically generates visualizations that allow users to explore different Operational Taxonomic Units (OTUs) found in biological samples.

## Features

- **Data Fetching**: Asynchronously retrieves JSON data containing sample information, OTU IDs, and metadata.
- **Bar Chart Visualization**: Displays the top 10 OTUs found in a selected sample as a horizontal bar chart.
- **Bubble Chart Visualization**: Represents the sample values of OTUs in a bubble chart, with marker size corresponding to sample value magnitude.
- **Sample Metadata Display**: Shows detailed metadata for each selected sample in a dedicated panel.
- **Interactive Dashboard**: Allows users to select different samples from a dropdown menu, updating all visualizations and metadata information accordingly.

## Usage

1. **Starting the Dashboard**: Open the HTML file hosting the script in a web browser to start the interactive dashboard.
2. **Selecting Samples**: Use the dropdown menu at the top of the dashboard to switch between different samples.
3. **Viewing Charts**: The bar and bubble charts will automatically update based on the selected sample.
4. **Reading Metadata**: The metadata panel displays the details of the selected sample.

## Setup

To set up the project locally, you need:

- A web browser with JavaScript support.
- A local server environment (like Python's SimpleHTTPServer) if running from your machine due to browser cross-origin restrictions.

### Running a Local Server (Optional)

If you have Python installed, you can set up a simple server using the following command in the directory where your project files are located:

```bash
# Python 3.x
python -m http.server
