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
  mouseDownBoard(position) {
    AppDispatcher.dispatch({
      type: ActionTypes.MOUSE_DOWN_BOARD,
      x01: position.x01,
      y01: position.y01
    });
  },
  mouseMoveBoard(position) {
    AppDispatcher.dispatch({
      type: ActionTypes.MOUSE_MOVE_BOARD,
      x01: position.x01,
      y01: position.y01
    });
  },
};

export default Actions
