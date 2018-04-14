import {Container} from 'flux/utils'
import GameView from '../views/GameView'
import BoardStore from '../data/BoardStore'
import GameDataStore from '../data/GameDataStore'

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
  }
}

export default Container.createFunctional(GameView, getStores, getState)
