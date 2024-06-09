# Freqtrade Data Visualization 

This is a `DEMO` Trade Data Visualization application built with Node.js, Express, Chart.js, and Tailwind CSS. 
The application allows users to upload JSON files containing trade data and visualize the data on a scatter-line chart with zoom and pan capabilities.

## Features

- List available JSON files in the `files` folder
- Visualize trade data on a scatter-line chart
- Zoom in and out of the chart
- Apply a date range zoom
- Responsive design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine

### Installing Dependencies

1. Clone the repository

```sh
git clone https://github.com/your-username/trade-data-visualization.git
cd trade-data-visualization
```


2. Install the dependencies

```sh
npm install
```

3. To start

```sh
npm start
```

4. To run automated tests

```sh
npm test
```

Run unit tests only:

```sh  
npm run test:unit -- --detectOpenHandles
```

Run integration tests only:

```sh
npm run test:e2e -- --detectOpenHandles
```