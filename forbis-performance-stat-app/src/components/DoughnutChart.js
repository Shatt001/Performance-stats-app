import React from 'react';
import Chart from 'chart.js';

class DoughnutChart extends React.Component {

  canvasRef = React.createRef();

  setData = () => {
    this.myChart.data.labels = this.props.datasets[0].data.map(e => e.time);

    const newDatasets = this.props.datasets.map((e) => {
      const result = {};
      result.data = e.data.map(d => d.value);
      result.label = e.title;
      // result.barPercentage = 1;
      // result.categoryPercentage = 0.9;
      // result.backgroundColor = e.color;

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
      type: 'doughnut',
      options: {
        maintainAspectRatio: false
      },
      data: {
        labels: [],
        datasets: []
      }
    });
    this.setData();
  }


  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

export default DoughnutChart;