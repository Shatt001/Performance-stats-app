const statsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_STATS':
      return {
        payload: action.payload,
        meta: action.meta
      }
    case 'CHANGE_META':
      return {
        payload: state.payload,
        meta: action.meta
      }
    default:
      return state
  }
}

export default statsReducer