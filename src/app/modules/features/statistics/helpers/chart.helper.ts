export function chartHelper(config) {
  return {
    type: config.type || 'line',
    gridLines: {
      drawOnChartArea: false,
    },
    options: {
      responsive: false,
      padding: 10,
    },
    data: {
      labels: config.labels,
      datasets: [
        {
          label: config.label,
          data: config.data,
          borderColor: config.color,
          backgroundColor: config.color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
