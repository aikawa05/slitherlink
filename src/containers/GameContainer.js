import {Container} from 'flux/utils'
import GameView from '../views/GameView'
import BoardStore from '../data/BoardStore'

function getStores() {
  return [
    BoardStore
  ]
}

function getState() {
  return {
    board: BoardStore.getState()
  }
}

export default Container.createFunctional(GameView, getStores, getState)
