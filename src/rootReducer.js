import {USER_LOGGED_OUT} from './types';

const rootReducer = (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = {}
      }
  }

export default rootReducer;