import React, { useContext } from 'react';
import BarChart from './BarChart'
import LineChart from './LineChart'
import LoadingPage from './LoadingPage'
import StatsContext from '../context/stats-contex'

const SupportCharts = (props) => {
  const { statsState: { meta: statsMeta, payload: { supportResolved, supportOverdue } } } = useContext(StatsContext);
  const closedCount = [];
  const closedAvgHours = [];
  const overdueCount = [];

  closedCount.push({
    data: supportResolved.map(e => ({ time: new Date(e[0]), value: e[2] })),
    title: 'Closed issues. Total',
    color: "#3E517A"
  });

  closedAvgHours.push({
    data: supportResolved.map(e => ({ time: new Date(e[0]), value: e[3] })),
    title: 'Hours to close. Total',
    color: "#3E517A"
  });

  overdueCount.push({
    data: supportOverdue.map(e => ({ time: new Date(e[0]), value: e[1] })),
    title: 'Must be executed. Total',
    color: "#3E517A"
  });

  overdueCount.push({
    data: supportOverdue.map(e => ({ time: new Date(e[0]), value: e[2] })),
    title: 'Overdue. Total',
    color: "#617ebd"
  });

  if (props.state) {
    closedCount.push({
      data: supportResolved.map(e => ({ time: new Date(e[0]), value: e[5] })),
      title: 'Closed issues. Selected',
      color: "#3e7a41"
    });

    closedAvgHours.push({
      data: supportResolved.map(e => ({ time: new Date(e[0]), value: e[6] })),
      title: 'Hours to close. Selected',
      color: "#3e7a41"
    });

    overdueCount.push({
      data: supportOverdue.map(e => ({ time: new Date(e[0]), value: e[3] })),
      title: 'Must be executed. Selected',
      color: "#3e7a41"
    });

    overdueCount.push({
      data: supportOverdue.map(e => ({ time: new Date(e[0]), value: e[4] })),
      title: 'Overdue. Selected',
      color: "#69c96e"
    });
  }

  return (
    <div className="main chart-wrapper">
      {statsMeta.loading ?
        <LoadingPage /> :
        <div>
          <p className="header">Support closed issues per perdiod</p>
          <div className="chart-height-50proc-vh">
            <LineChart
              datasets={closedCount}
            />
          </div>
          <p className="header">Average time for one support issue to close per period</p>
          <div className="chart-height-50proc-vh">
            <LineChart
              datasets={closedAvgHours}
              convertTime={true}
            />
          </div>
          <p className="header">Overdue support issues vs total issues per period</p>
          <div className="chart-height-50proc-vh">
            <BarChart
              datasets={overdueCount}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default SupportCharts;