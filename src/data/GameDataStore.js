import {OrderedMap} from 'immutable'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class GameDataStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return new OrderedMap({toolName: "pen", problemId: Number(cookies.get("currentProblemId") || 1) })
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SELECT_PROBLEM:
        cookies.set("currentProblemId", action.problemId)
        return state.set("problemId", action.problemId)
      case ActionTypes.SELECT_TOOL:
        return state.set("toolName", action.toolName)
      default:
        return state
    }
  }
}

export default new GameDataStore()
