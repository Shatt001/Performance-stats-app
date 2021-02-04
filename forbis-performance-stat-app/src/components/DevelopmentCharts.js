import React, { useContext } from 'react';
import BarChart from './BarChart'
import LoadingPage from './LoadingPage'
import StatsContext from '../context/stats-contex'

const DevelopmentCharts = (props) => {
  const { statsState: { meta: statsMeta, payload: { developmentBugs } } } = useContext(StatsContext);
  const devBugsCount = [];

  devBugsCount.push({
    data: developmentBugs.map(e => ({ time: new Date(e[0]), value: e[3] })),
    title: 'Internal bugs. Total',
    color: "#3E517A"
  });

  devBugsCount.push({
    data: developmentBugs.map(e => ({ time: new Date(e[0]), value: e[2] })),
    title: 'External bugs. Total',
    color: "#617ebd"
  });

  if (props.state) {
    devBugsCount.push({
      data: developmentBugs.map(e => ({ time: new Date(e[0]), value: e[5] })),
      title: 'Internal bugs. Selected',
      color: "#3e7a41"
    });

    devBugsCount.push({
      data: developmentBugs.map(e => ({ time: new Date(e[0]), value: e[4] })),
      title: 'External bugs. Selected',
      color: "#69c96e"
    });
  }

  return (
    <div className="main chart-wrapper">
      {statsMeta.loading ?
        <LoadingPage /> :
        <div>
        <p className="header">Development internal vs external issues count per perdiod</p>
          <div className="chart-height-50proc-vh">
            <BarChart
              datasets={devBugsCount}
            />
          </div>
        </div>
      }
    </div>
  )
}

export default DevelopmentCharts;