import ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'

const Actions = {
  addProblem(problemId, problemData) {
    AppDispatcher.dispatch({
      type: ActionTypes.ADD_PROBLEM,
      problemId,
      problemData
    });
  },
  selectProblem(problemId) {
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_PROBLEM,
      problemId,
    });
  },
  selectTool(toolName) {
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_TOOL,
      toolName: toolName,
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
