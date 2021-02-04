import React, { useReducer, useEffect, useState, useCallback, useMemo } from 'react';
import { populateData, populateSelectors } from '../restApi/stats';
import statsReducer from '../reducers/stats';
import selectorsReducer from '../reducers/selectors';

const StatsContext = React.createContext();

export const StatsProvider = ({ children }) => {
  const [error, setError] = useState('');
  const defaultStats = { meta: { loading: true }, payload: [] };
  const defaultSelectors = { meta: { loading: true }, payload: {} };

  const [statsState, statsDispatch] = useReducer(statsReducer, defaultStats);
  const [selectorsState, selectorsDispatch] = useReducer(selectorsReducer, defaultSelectors);


  const changeStatsMeta = useCallback((newValue) => {
      statsDispatch({ type: 'CHANGE_META', meta: { loading: newValue } })
  }, []);

  const updateStats = useCallback((group, user) => {
    populateData(group, user).then(data => {
      statsDispatch({ type: 'POPULATE_STATS', payload: data, meta: { loading: false } })

      if (error) {
        setError('');
      };
    }).catch((err) => {
      setError(err);
    });
  }, [error]);


  useEffect(() => {
    updateStats(undefined, undefined);
  }, [])

  useEffect(() => {
    populateSelectors().then(data => {
      selectorsDispatch({ type: 'POPULATE_SELECTORS', payload: data, meta: { loading: false } })

      if (error) {
        setError('');
      };
    }).catch((err) => {
      setError(err);
    });
  }, [])

  return (
    <StatsContext.Provider value={{ statsState, statsDispatch, selectorsState, updateStats, changeStatsMeta }} >
      {error ? <p>{error}</p> : <div>{children}</div>}
    </StatsContext.Provider>
  );
};

export default StatsContext;