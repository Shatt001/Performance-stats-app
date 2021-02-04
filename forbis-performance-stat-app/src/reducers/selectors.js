const selectorsReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_SELECTORS':
      return {
        payload: action.payload,
        meta: action.meta
      }
    default:
      return state
  }
}

export default selectorsReducer