import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import Problem from '../models/Problem'
import ProblemData from './ProblemData'

class ProblemStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    var state = Immutable.OrderedMap()
    for (let i = 0; i < ProblemData["problems"].length; i++)
    {
      let id = i + 1
      state = state.set(id, new Problem(id, ProblemData["problems"][i]));
    }
    return state
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return state
    }
  }

  getProblem(id) {
    return this.getState().get(Number(id))
  }
}

export default new ProblemStore()
