const defaultStrategy = state => state;

function createReducer(strategyMap, initialState) {
  return (state = initialState, action) => (strategyMap[action.type] !== undefined
    ? strategyMap[action.type](state, action)
    : defaultStrategy(state, action));
}

export default createReducer;