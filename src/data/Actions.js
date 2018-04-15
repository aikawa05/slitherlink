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
  drawLine(linePosition) {
    AppDispatcher.dispatch({
      type: ActionTypes.DRAW_LINE,
      linePosition
    });
  },
  eraseLine(linePosition) {
    AppDispatcher.dispatch({
      type: ActionTypes.ERASE_LINE,
      linePosition
    });
  },
};

export default Actions
