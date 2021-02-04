const oracledb = require('oracledb');
const dbConfig = require('../utils/config/dbconfig.js');
const path = require('path')

const initOracleClient = () => {
  const oracleClientByOs = process.platform === 'linux' ? 'instantclient_18_5_linux' : 'instantclient_18_5_win'
  const libDir = path.join(__dirname, '..', 'utils', oracleClientByOs, 'instantclient_18_5');
  console.log(libDir);

  try {
    oracledb.initOracleClient(
      {
        libDir
      });
  } catch (err) {
    throw 'Error on init OracleClient - ' + err;
  }
}

async function execDB(params, cursors) {
  let stage = '0';
  let connection;
  const numRows = 200;
  let returnArr = [];

  try {
    stage = '1';
    connection = await oracledb.getConnection(dbConfig);
    let result;

    for (let i = 0; i < cursors.length; i++) {
      stage = '2.' + i;

      if (params) {
        result = await connection.execute(
          cursors[i].cursor,
          {
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
            group: params.group,
            user: params.user
          });
      } else {
        result = await connection.execute(
          cursors[i].cursor,
          {
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
          });
      };

      const resultSet = result.outBinds.cursor;
      let rows;
      const allRows = [];

      do {
        rows = await resultSet.getRows(numRows); // get numRows rows at a time
        if (rows.length > 0) {
          allRows.push(...rows)
        }
      } while (rows.length === numRows);

      returnArr.push({
        meta: cursors[i].type,
        payload: {
          columns: [...result.outBinds.cursor.metaData],
          values: allRows
        }
      })

      await resultSet.close(); //always close the ResultSet
    };

  } catch (err) {
    throw 'Error on ' + stage + ' stage - ' + err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        throw 'Error on close connection - ' + err;
      }
    }
  }
  return returnArr;
}

async function getData(params) {
  const supportResolved = {
    type: 'SUPPORT_RESOLVED',
    cursor: `BEGIN
              :cursor := PM_PERFORMANCE_STATS.GET_SUPP_RESOLVED_TASKS_STAT(:group, :user);
            END;`
  };

  const supportOverdue = {
    type: 'SUPPORT_OVERDUE',
    cursor: `BEGIN
              :cursor := PM_PERFORMANCE_STATS.GET_SUPP_OVERDUE_TASKS_STAT(:group, :user);
            END;`
  };

  const developmentBugs = {
    type: 'DEVELOPMENT_BUGS',
    cursor: `BEGIN
              :cursor := PM_PERFORMANCE_STATS.GET_DEV_BUGS_STAT(:group, :user);
            END;`
  };

  const cursors = [supportResolved, supportOverdue, developmentBugs];
  const result = execDB(params, cursors);

  return result;
}

async function getSelectors() {
  const usersCursor = {
    type: 'USERS',
    cursor: `BEGIN
              OPEN :cursor FOR 
              SELECT column_value users_list FROM TABLE(PM.PM_REP_JIRA.GET_GROUP_USERS(NULL)) ORDER BY users_list;
            END;`
  };

  const groupsCursor = {
    type: 'GROUPS',
    cursor: `BEGIN
              OPEN :cursor FOR 
              SELECT column_value groups_list FROM TABLE(PM.PM_REP_JIRA.GET_DECLARING_GROUPS) ORDER BY groups_list;
            END;`
  };

  const cursors = [usersCursor, groupsCursor];
  const result = execDB(undefined, cursors);

  return result;
}

exports.getData = getData;
exports.getSelectors = getSelectors;
exports.initOracleClient = initOracleClient;

