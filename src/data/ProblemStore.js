import Immutable from 'immutable'
import {ReduceStore} from 'flux/utils'
import AppDispatcher from './AppDispatcher'
import ActionTypes from './ActionTypes'
import ProblemData from './ProblemData'
import BoardStore from './BoardStore'
import Problem from '../models/Problem'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class ProblemStore extends ReduceStore {
  constructor() {
    super(AppDispatcher)
  }

  getInitialState() {
    var state = Immutable.OrderedMap()
    for (let i = 0; i < ProblemData["problems"].length; i++)
    {
      var id = i + 1
      var data = ProblemData["problems"][i]
      var savedData = cookies.get("p" + id) || {}
      var currentLines = savedData["lines"] || []
      var cleared = savedData["cleared"] || false
      state = state.set(id, new Problem(id, Immutable.OrderedMap({
        id: id,
        hints: data.hints,
        width: data.width,
        height: data.height,
        numbers: Immutable.List(data.numbers),
        lines: Immutable.List(data.lines),
        currentLines: Immutable.List(currentLines),
        cleared: cleared })));
    }
    return state
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.DRAW_LINE:
      case ActionTypes.ERASE_LINE:
        AppDispatcher.waitFor([BoardStore.getDispatchToken()])
        var problem = BoardStore.getState().problem
        if (state.get(problem.id) !== problem)
        {
          cookies.set("p" + problem.id, {lines: problem.currentLines, cleared: problem.cleared})
        }
        return state.set(problem.id, problem)
      default:
        return state
    }
  }

  getProblem(id) {
    return this.getState().get(Number(id))
  }
}

export default new ProblemStore()
