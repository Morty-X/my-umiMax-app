const defaultState = 0;
type CountAction = { type: 'INCREASE' } | { type: 'DECREASE' };
export const countReducer = (preState = defaultState, action: CountAction) => {
  switch (action.type) {
    case 'INCREASE':
      return preState + 1;
    case 'DECREASE':
      return preState - 1;
    default:
      return preState;
  }
};
