import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import Board from '../models/Board'
import ProblemStore from './ProblemStore'

class BoardStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return new Board()
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.INIT_BOARD:
        return new Board(ProblemStore.getProblem(action.problem_id))
      default:
        return state
    }
  }
}

export default new BoardStore()
