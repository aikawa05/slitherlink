import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import Board from '../models/Board'
import ProblemStore from './ProblemStore'
import GameDataStore from './GameDataStore'

class BoardStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return new Board()
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SELECT_PROBLEM:
        return new Board(ProblemStore.getProblem(action.problemId))
      case ActionTypes.MOUSE_DOWN_BOARD:
      case ActionTypes.MOUSE_MOVE_BOARD:
        var position = state.convertToLinePosition(action.x01, action.y01)
        if (GameDataStore.getState().get("toolName") === "pen")
        {
          return state.setLine(position.x, position.y)
        }
        else if (GameDataStore.getState().get("toolName") === "eraser")
        {
          return state.removeLine(position.x, position.y)
        }
        return state
      default:
        return state
    }
  }
}

export default new BoardStore()
