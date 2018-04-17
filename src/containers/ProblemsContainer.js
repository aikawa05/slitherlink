import {Container} from 'flux/utils'
import ProblemsView from '../views/ProblemsView'
import GameDataStore from '../data/GameDataStore'
import ProblemStore from '../data/ProblemStore'

function getStores() {
  return [
    ProblemStore,
    GameDataStore,
  ]
}

function getState() {
  return {
    problems: ProblemStore.getState(),
    currentProblemId: GameDataStore.getState().get("problemId")
  }
}

export default Container.createFunctional(ProblemsView, getStores, getState)
