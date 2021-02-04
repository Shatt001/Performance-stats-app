import React, { useContext, useState } from 'react';
import AutoComplete from './AutoComplete';
import LoadingPage from './LoadingPage';
import StatsContext from '../context/stats-contex';
import SupportCharts from './SupportCharts';
import DevelopmentCharts from './DevelopmentCharts';

const MainPage = () => {
  const {
    statsState: { meta: statsMeta },
    selectorsState: {
      meta: selectorsMeta,
      payload: { groupsList, usersList } },
    updateStats, changeStatsMeta
  } = useContext(StatsContext);

  const [state, setState] = useState(false);

  const LoadSelected = (group, userName) => {
    const user = usersList.find(e => e.fullName.toLowerCase() === userName.toLowerCase());
    setState(true);
    changeStatsMeta(true);
    updateStats(group, user ? user.id : '');
  };

  const ClearSelected = () => {
    setState(false);
  };

  return (
    <div className="main-block">
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header__title">Performance stats</h1>
        </div>
      </div>
      {
        selectorsMeta.loading ?
          <div className="content-container">
            <LoadingPage />
          </div> :
          <AutoComplete
            groupsList={groupsList}
            usersList={usersList.map(e => e.fullName)}
            phGroup="Group..."
            phUser="User..."
            submitLoad={LoadSelected}
            submitClear={ClearSelected}
            state={state}
          />
      }
      <div className="content-container">
        <h2 className="header">Development stats</h2>
        {
          statsMeta.loading || selectorsMeta.loading ?
            <LoadingPage /> :
            <DevelopmentCharts state={state} />
        }
      </div>
      <div className="content-container">
        <h2 className="header">Support stats</h2>
        {
          statsMeta.loading || selectorsMeta.loading ?
            <LoadingPage /> :
            <SupportCharts state={state} />
        }

      </div>
    </div>
  );
};

export default MainPage;