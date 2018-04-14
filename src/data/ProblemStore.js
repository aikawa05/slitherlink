import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import Problem from '../models/Problem'

class ProblemStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return Immutable.OrderedMap()
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.ADD_PROBLEM:
        return state.set(action.problemId, new Problem(action.problemId, action.problemData));
      default:
        return state
    }
  }

  getProblem(id) {
    return this.getState().get(Number(id))
  }
}

export default new ProblemStore()
