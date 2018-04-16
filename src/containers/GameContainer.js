import {Container} from 'flux/utils'
import GameView from '../views/GameView'
import BoardStore from '../data/BoardStore'
import GameDataStore from '../data/GameDataStore'
import ProblemStore from '../data/ProblemStore'

function getStores() {
  return [
    BoardStore,
    GameDataStore,
  ]
}

function getState() {
  return {
    board: BoardStore.getState(),
    toolName: GameDataStore.getState().get("toolName"),
    problem: ProblemStore.getState().get(GameDataStore.getState().get("problemId")),
  }
}

export default Container.createFunctional(GameView, getStores, getState)
