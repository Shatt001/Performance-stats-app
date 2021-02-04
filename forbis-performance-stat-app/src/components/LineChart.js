import React from 'react';
import Chart from 'chart.js';
import { floatToTime } from '../utils/time';

class LineChart extends React.Component {

  canvasRef = React.createRef();

  setData = () => {
    this.myChart.data.labels = this.props.datasets[0].data.map(e => e.time);

    const newDatasets = this.props.datasets.map((e) => {
      const result = {};
      result.data = e.data.map(d => d.value);
      result.label = e.title;
      result.fill = 'none';
      result.backgroundColor = e.color;
      result.pointRadius = 2;
      result.borderColor = e.color;
      result.borderWidth = 1;
      result.lineTension = 0;
      return result;
    })
    this.myChart.data.datasets = newDatasets;
    this.myChart.update();
  }

  componentDidUpdate() {
    this.setData();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: 'line',
      options: {
        maintainAspectRatio: false,
        tooltips: {
          callbacks: this.props.convertTime ?
            {
              label: function (tooltipItem, data) {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (label) {
                  label += ': ';
                }
                label += floatToTime(tooltipItem.yLabel);

                return label;
              }
            } :
            {}
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                displayFormats: {
                  month: 'YYYY MMM'
                },
                tooltipFormat: 'YYYY.MM.DD',
                unit: 'month'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: [],
        datasets: []
      }
    });
    this.setData();
  };


  render() {

    return <canvas ref={this.canvasRef} />;
  }
}

export default LineChart;