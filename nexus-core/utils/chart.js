function generateChart(labels, data) {
  return `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
    type: "line",
    data: {
      labels,
      datasets: [{ label: "Activity", data }]
    }
  }))}`;
}

module.exports = { generateChart };
