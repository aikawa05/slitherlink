import {OrderedMap} from 'immutable'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'

class GameDataStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    return new OrderedMap({toolName: "pen"})
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.SELECT_PROBLEM:
        return state.set("problemId", action.problemId)
      case ActionTypes.SELECT_TOOL:
        return state.set("toolName", action.toolName)
      default:
        return state
    }
  }
}

export default new GameDataStore()
