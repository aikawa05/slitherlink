import ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'

const Actions = {
  addProblem(problem_id, problem_data) {
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_PROBLEM,
      problem_id,
      problem_data
    });
  },
  initBoard(problem_id) {
    AppDispatcher.dispatch({
      type: ActionTypes.INIT_BOARD,
      problem_id,
    });
  },
};

export default Actions
